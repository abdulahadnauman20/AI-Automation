const axios = require('axios');
const asyncError = require("../Middleware/asyncError.js");
const ErrorHandler = require("../Utils/errorHandler");
const { Op } = require('sequelize');

require('dotenv').config();

const { ExtractTitleAndLocation, EnrichLeadWithApollo, ExtractAllPossible } = require('../Utils/leadUtils');

const LeadModel = require("../Model/leadModel");
const CampaignModel = require("../Model/campaignModel");

exports.AddLeadsToCampaign = asyncError(async (req, res, next) => {
  const { Leads, CampaignId } = req.body;

  // Validate inputs
  if (!Leads || !Array.isArray(Leads) || Leads.length === 0) {
    return next(new ErrorHandler("Please select at least one lead", 400));
  }

  if (!CampaignId) {
    return next(new ErrorHandler("Please select a campaign first", 400));
  }

  // Find campaign and validate ownership
  const campaign = await CampaignModel.findByPk(CampaignId);

  if (!campaign) {
    return next(new ErrorHandler("Campaign not found", 404));
  }

  if (campaign.WorkspaceId !== req.user.User.CurrentWorkspaceId) {
    return next(new ErrorHandler("You don't have permission to add leads to this campaign", 403));
  }

  // Prepare leads for insertion
  const leadsToInsert = Leads.map(lead => ({
    Name: lead.name || `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
    Email: lead.email || null,
    Phone: lead.phone || null,
    Company: lead.company || null,
    Status: "Discovery", // Default value
    CampaignId: CampaignId,
    Website: lead.website || null,
    Title: lead.title || null,
    Location: lead.location || null,
    EmployeeCount: lead.employeeCount || null
  }));

  // Insert leads in bulk
  try {
    const insertedLeads = await LeadModel.bulkCreate(leadsToInsert, {
      validate: true,
      returning: true
    });

    res.status(201).json({
      success: true,
      message: `${insertedLeads.length} leads added to campaign successfully`,
      leads: insertedLeads
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      return next(new ErrorHandler(`Validation error: ${validationErrors.join(', ')}`, 400));
    }
    throw error;
  }
});

exports.GetAllLeads = asyncError(async (req, res) => {
  const leads = await LeadModel.findAll();

  res.status(200).json({
    success: true,
    leads
  });
});

exports.GetLeadById = asyncError(async (req, res, next) => {
  const { leadid } = req.params;
  const lead = await LeadModel.findByPk(leadid);

  if (!lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }

  res.status(200).json({
    success: true,
    lead
  });
});

exports.UpdateLead = asyncError(async (req, res, next) => {
  const { leadid } = req.params;
  const { Name, Email, Phone, Company, CampaignId, Website, Title, Location } = req.body;

  const Lead = await LeadModel.findByPk(leadid);

  if (!Lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }

  await LeadModel.update({
    Name: Name.trim() || LeadModel.Name,
    Email: Email || LeadModel.Email,
    Phone: Phone || LeadModel.Phone,
    Company: Company || LeadModel.Company,
    CampaignId: CampaignId || LeadModel.CampaignId,
    Website: Website || LeadModel.Website,
    Title: Title || LeadModel.Title,
    Location: Location || LeadModel.Location,
  });

  res.status(200).json({
    success: true,
    message: "Lead updated successfully",
    Lead
  });
});

exports.DeleteLead = asyncError(async (req, res, next) => {
  const { leadid } = req.params;
  const CurrentWorkspaceId = req.user.User.CurrentWorkspaceId;

  const lead = await LeadModel.findByPk(leadid);
  const campaignId = lead.CampaignId;
  
  const campaign = await CampaignModel.findOne({
    where: {
      id: campaignId,
      WorkspaceId: CurrentWorkspaceId
    }
  });

  if (!campaign) {
    return next(new ErrorHandler("This lead is not part of the campaign", 404));
  }

  if (!lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }

  await lead.destroy();

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully"
  });
});

exports.UpdateLeadStatus = asyncError(async (req, res, next) => {
  const { leadid } = req.params;
  const { status } = req.body;

  const lead = await LeadModel.findByPk(leadid);

  if (!lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }

  lead.Status = status;
  await lead.save();

  res.status(200).json({
    success: true,
    message: "Lead status updated successfully",
    lead
  });
});

exports.SearchLeads = asyncError(async (req, res, next) => {
  try {
    const { query, page = 1, per_page = 10, person_titles, industries, employees, revenues, names, companies, locations } = req.body;

    console.log('Backend received request body:', req.body);
    console.log('Backend received query:', query);

    if (!query) {
      return res.status(400).json({ error: 'No search query provided' });
    }

    // Extract as much as possible from the query
    const { title, location, company, keyword } = ExtractAllPossible(query);
    
    console.log('Backend extracted parameters:', { title, location, company, keyword });

    // Prepare Apollo API parameters (only supported ones)
    const apolloParams = {
      per_page: parseInt(per_page),
      page: parseInt(page)
    };

    // Use filters from request body if provided, otherwise use extracted from query
    if (person_titles && Array.isArray(person_titles) && person_titles.length > 0) {
      apolloParams.person_titles = person_titles;
    } else if (title) {
      apolloParams.person_titles = [title];
    }

    // Apollo expects canonical industry values. Map common frontend values to Apollo's expected values.
    const industryMap = {
      'Tech': 'information technology',
      'IT': 'information technology',
      'Information Technology': 'information technology',
      'Finance': 'financial services',
      'Healthcare': 'hospital & health care',
      'Retail': 'retail',
      // Add more mappings as needed
    };
    // See: https://docs.peopledatalabs.com/docs/industries for Apollo's canonical industry values

    let mappedIndustries = industries && Array.isArray(industries)
      ? industries.map(ind => industryMap[ind] || ind)
      : undefined;

    if (mappedIndustries && mappedIndustries.length > 0) {
      apolloParams.organization_industries = mappedIndustries;
    }

    // Map frontend employee ranges to Apollo's expected format
    if (employees && Array.isArray(employees) && employees.length > 0) {
      const employeeRangeMap = {
        '1-10': '1,10',
        '11-50': '11,50',
        '51-200': '51,200',
        '201-500': '201,500',
        '501-1000': '501,1000',
        '1000+': '1001,'
      };
      
      const mappedEmployeeRanges = employees.map(emp => employeeRangeMap[emp] || emp);
      apolloParams.organization_num_employees_ranges = mappedEmployeeRanges;
    }

    // Map frontend revenue ranges to Apollo's expected format
    if (revenues && Array.isArray(revenues) && revenues.length > 0) {
      const revenueRangeMap = {
        '$0-1M': '0,1000000',
        '$1M-10M': '1000000,10000000',
        '$10M-50M': '10000000,50000000',
        '$50M-250M': '50000000,250000000',
        '$250M-1B': '250000000,1000000000',
        '$1B+': '1000000000,'
      };
      
      const mappedRevenueRanges = revenues.map(rev => revenueRangeMap[rev] || rev);
      apolloParams.organization_annual_revenue_ranges = mappedRevenueRanges;
    }

    // Add person names filter
    if (names && Array.isArray(names) && names.length > 0) {
      console.log('Processing names filter:', names);
      // Use q_keywords for name searches as Apollo API supports this
      const nameKeywords = names.join(' ');
      if (apolloParams.q_keywords) {
        apolloParams.q_keywords = `${apolloParams.q_keywords} ${nameKeywords}`;
      } else {
        apolloParams.q_keywords = nameKeywords;
      }
      console.log('Updated q_keywords with names:', apolloParams.q_keywords);
    }

    // Add company names filter
    if (companies && Array.isArray(companies) && companies.length > 0) {
      console.log('Processing companies filter:', companies);
      // Try using organization_names parameter for company searches
      apolloParams.organization_names = companies;
      console.log('Set organization_names to:', apolloParams.organization_names);
      
      // Also add to q_keywords as a fallback
      const companyKeywords = companies.join(' ');
      if (apolloParams.q_keywords) {
        apolloParams.q_keywords = `${apolloParams.q_keywords} ${companyKeywords}`;
      } else {
        apolloParams.q_keywords = companyKeywords;
      }
      console.log('Also added to q_keywords:', apolloParams.q_keywords);
    } else if (company) {
      console.log('Processing extracted company:', company);
      apolloParams.organization_names = [company];
      console.log('Set organization_names to:', apolloParams.organization_names);
      
      // Also add to q_keywords as a fallback
      if (apolloParams.q_keywords) {
        apolloParams.q_keywords = `${apolloParams.q_keywords} ${company}`;
      } else {
        apolloParams.q_keywords = company;
      }
      console.log('Also added to q_keywords:', apolloParams.q_keywords);
    }

    // Add person locations filter
    if (locations && Array.isArray(locations) && locations.length > 0) {
      apolloParams.person_locations = locations;
    } else if (location) {
      apolloParams.person_locations = [location];
    }

    if (keyword) {
      if (apolloParams.q_keywords) {
        apolloParams.q_keywords = `${apolloParams.q_keywords} ${keyword}`;
      } else {
        apolloParams.q_keywords = keyword;
      }
    }

    // Log Apollo API parameters for every request
    console.log('Apollo API params:', apolloParams);

    // Only error if nothing at all is found
    const hasAnyFilter = title || location || company || keyword || 
                        (person_titles && person_titles.length > 0) ||
                        (industries && industries.length > 0) ||
                        (employees && employees.length > 0) ||
                        (revenues && revenues.length > 0) ||
                        (names && names.length > 0) ||
                        (companies && companies.length > 0);
    
    if (!hasAnyFilter) {
      return res.status(400).json({
        error: 'Could not extract any searchable information from query or filters',
        query: query,
        filters: { person_titles, industries, employees, revenues, names, companies }
      });
    }

    // Make a single call to Apollo API
    const APOLLO_API_URL = 'https://api.apollo.io/v1/mixed_people/search';

    try {
      const apolloResponse = await axios.get(APOLLO_API_URL, {
        params: apolloParams,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': process.env.APOLLO_API_KEY,
        }
      });

      console.log('Apollo API response status:', apolloResponse.status);
      console.log('Apollo API response data keys:', Object.keys(apolloResponse.data));
      console.log('Apollo API total entries:', apolloResponse.data.pagination?.total_entries);
      console.log('Apollo API people count:', apolloResponse.data.people?.length || 0);

      const leads = apolloResponse.data.people || [];
      const enrichedLeads = [];

      // Enrich each lead using Apollo's enrichment API
      for (const lead of leads) {
        try {
          let enrichedLead = null;
          if (lead.id) {
            try {
              enrichedLead = await EnrichLeadWithApollo(lead.id);
            } catch (enrichErr) {
              console.error(`Failed to enrich lead with ID ${lead.id}: ${enrichErr.message}`);
            }
            enrichedLeads.push({
              id: lead.id,
              name: (enrichedLead?.name || `${enrichedLead?.first_name || lead.first_name || ''} ${enrichedLead?.last_name || lead.last_name || ''}`.trim() || lead.name || null),
              email: enrichedLead?.email || lead.email || null,
              phone: enrichedLead?.organization?.phone || lead.organization?.phone || null,
              company: enrichedLead?.organization?.name || lead.organization?.name || null,
              title: enrichedLead?.title || lead.title || null,
              location: ([enrichedLead?.city || lead.city, enrichedLead?.state || lead.state, enrichedLead?.country || lead.country]
                .filter(Boolean)
                .join(', ')) || null,
              website: enrichedLead?.organization?.website_url || lead.organization?.website_url || null,
              employeeCount: enrichedLead?.organization?.estimated_num_employees || lead.organization?.estimated_num_employees || null
            });
          } else {
            console.warn(`Lead with missing ID skipped: ${JSON.stringify(lead)}`);
          }
        } catch (error) {
          console.error(`Failed to process lead with ID ${lead.id}: ${error.message}`);
        }
      }

      // Get pagination info from Apollo response
      const paginationInfo = {
        currentPage: parseInt(page),
        perPage: parseInt(per_page),
        totalResults: apolloResponse.data.pagination?.total_entries || 0,
        totalPages: apolloResponse.data.pagination?.total_pages || 1
      };

      // Return the enriched leads along with pagination info
      return res.json({
        originalQuery: query,
        extractedParameters: {
          titles: title ? [title] : [],
          locations: location ? [location] : [],
          companies: company ? [company] : [],
          keywords: keyword ? [keyword] : []
        },
        pagination: paginationInfo,
        results: enrichedLeads
      });

    } catch (error) {
      // Log and return Apollo API error details for easier debugging
      console.error('Apollo API error:', error?.response?.data || error.message);
      return res.status(500).json({
        error: 'Failed to retrieve data from Apollo API',
        details: error?.response?.data || error.message,
        extractedParameters: {
          titles: title ? [title] : [],
          locations: location ? [location] : [],
          companies: company ? [company] : [],
          keywords: keyword ? [keyword] : []
        }
      });
    }
  } catch (error) {
    return next(new ErrorHandler('Failed to process search query', 500));
  }
});

exports.SearchLeadsByFilter = asyncError(async (req, res, next) => {
  try {
    const {
      person_titles,
      person_locations,
      organization_locations,
      person_seniorities,
      person_departments,
      include_similar_titles,
      q_organization_domains_list,
      organization_ids,
      organization_num_employees_ranges,
      q_keywords,
      contact_email_status,
      page = 1,
      per_page = 5
    } = req.body;

    // Prepare Apollo API parameters
    const apolloParams = {
      per_page: parseInt(per_page),
      page: parseInt(page),
    };

    if (person_titles) apolloParams.person_titles = person_titles; //exists
    if (include_similar_titles) apolloParams.include_similar_titles = include_similar_titles;
    if (person_seniorities) apolloParams.person_seniorities = person_seniorities; //exists
    if (organization_locations) apolloParams.organization_locations = organization_locations; //exists
    if (q_organization_domains_list) apolloParams.q_organization_domains_list = q_organization_domains_list; //exists
    if (organization_ids) apolloParams.organization_ids = organization_ids; //exists
    if (organization_num_employees_ranges) apolloParams.organization_num_employees_ranges = organization_num_employees_ranges;
    if (person_locations) apolloParams.person_locations = person_locations;
    if (contact_email_status) apolloParams.contact_email_status = contact_email_status;
    if (q_keywords) apolloParams.q_keywords = q_keywords;
    if (person_departments) apolloParams.person_departments = person_departments;

    // Ensure at least one filter is provided
    if (Object.keys(apolloParams).length <= 2) { // Only `page` and `per_page` are default
      return res.status(400).json({
        error: 'Please provide at least one filter for the search query',
      });
    }

    // Make a single call to Apollo API
    const APOLLO_API_URL = 'https://api.apollo.io/v1/mixed_people/search';

    try {
      const apolloResponse = await axios.get(APOLLO_API_URL, {
        params: apolloParams,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': process.env.APOLLO_API_KEY,
        },
      });

      const leads = apolloResponse.data.people || [];
      const enrichedLeads = [];

      // Enrich each lead using Apollo's enrichment API
      for (const lead of leads) {
        try {
          let enrichedLead = null;
          if (lead.id) {
            try {
              enrichedLead = await EnrichLeadWithApollo(lead.id);
            } catch (enrichErr) {
              console.error(`Failed to enrich lead with ID ${lead.id}: ${enrichErr.message}`);
            }
            enrichedLeads.push({
              id: lead.id,
              name: (enrichedLead?.name || `${enrichedLead?.first_name || lead.first_name || ''} ${enrichedLead?.last_name || lead.last_name || ''}`.trim() || lead.name || null),
              email: enrichedLead?.email || lead.email || null,
              phone: enrichedLead?.organization?.phone || lead.organization?.phone || null,
              company: enrichedLead?.organization?.name || lead.organization?.name || null,
              title: enrichedLead?.title || lead.title || null,
              location: ([enrichedLead?.city || lead.city, enrichedLead?.state || lead.state, enrichedLead?.country || lead.country]
                .filter(Boolean)
                .join(', ')) || null,
              website: enrichedLead?.organization?.website_url || lead.organization?.website_url || null,
              employeeCount: enrichedLead?.organization?.estimated_num_employees || lead.organization?.estimated_num_employees || null,
            });
          } else {
            console.warn(`Lead with missing ID skipped: ${JSON.stringify(lead)}`);
          }
        } catch (error) {
          console.error(`Failed to process lead with ID ${lead.id}: ${error.message}`);
        }
      }

      // Get pagination info from Apollo response
      const paginationInfo = {
        currentPage: parseInt(page),
        perPage: parseInt(per_page),
        totalResults: apolloResponse.data.pagination?.total_entries || 0,
        totalPages: apolloResponse.data.pagination?.total_pages || 1,
      };

      // Return the enriched leads along with pagination info
      return res.json({
        filtersUsed: apolloParams,
        pagination: paginationInfo,
        results: enrichedLeads,
      });

    } catch (error) {
      console.error('Apollo API error:', error.message);
      return res.status(500).json({
        error: 'Failed to retrieve data from Apollo API',
        details: error.message,
        filtersUsed: apolloParams,
      });
    }
  } catch (error) {
    console.error('Error processing search:', error);
    return next(new ErrorHandler('Failed to process search query', 500));
  }
});

exports.findLookalikeCompanies = asyncError(async (req, res, next) => {
    const { domain } = req.body;

    if (!domain) {
        return next(new ErrorHandler("Domain is required", 400));
    }

    // 1. Find the company name for the given domain.
    const companyNameFromDomain = domain.split('.')[0];
    
    const originalLead = await LeadModel.findOne({ 
        where: { 
            [Op.or]: [
                { Website: { [Op.like]: `%${domain}%` } },
                { Company: { [Op.like]: `%${companyNameFromDomain}%` } }
            ]
        } 
    });

    if (!originalLead || !originalLead.Company) {
        return next(new ErrorHandler(`Could not find a company associated with ${domain}.`, 404));
    }

    const companyToSearch = originalLead.Company;

    // 2. Find other leads from the same company.
    const lookalikeLeads = await LeadModel.findAll({
        where: {
            Company: companyToSearch,
        },
        attributes: ['Company', 'Name', 'Email'], // Returning more info can be useful
        limit: 20
    });

    // 3. Return a unique list of company names (which will be just one)
    // and a list of contacts from that company.
    const companies = [...new Set(lookalikeLeads.map(lead => lead.Company))];
    const contacts = lookalikeLeads.map(lead => ({ name: lead.Name, email: lead.Email }));


    res.status(200).json({
        success: true,
        companies,
        contacts 
    });
});