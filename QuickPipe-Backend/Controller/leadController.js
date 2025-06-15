const axios = require('axios');
const catchAsyncError = require("../Middleware/asyncError");
const ErrorHandler = require("../Utils/errorHandler");

require('dotenv').config();

const { ExtractTitleAndLocation , EnrichLeadWithApollo } = require('../Utils/leadUtils');

const LeadModel = require("../Model/leadModel");
const CampaignModel = require("../Model/campaignModel");

exports.AddLeadsToCampaign = catchAsyncError(async (req, res, next) => {
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

exports.GetAllLeads = catchAsyncError(async (req, res) => {
  const leads = await LeadModel.findAll();

  res.status(200).json({
    success: true,
    leads
  });
});

exports.GetLeadById = catchAsyncError(async (req, res, next) => {
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

exports.UpdateLead = catchAsyncError(async (req, res, next) => {
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

exports.DeleteLead = catchAsyncError(async (req, res, next) => {
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

exports.UpdateLeadStatus = catchAsyncError(async (req, res, next) => {
  const { leadid } = req.params;
  const { status } = req.body;

  const lead = awaitLLeadModel.findByPk(leadid);

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

exports.SearchLeads = catchAsyncError(async (req, res, next) => {
  try {
    const { query, page = 1, per_page = 10 } = req.body;
    console.log('SearchLeads request received:', req.body);

    if (!query) {
      console.log('No query provided');
      return res.status(400).json({ error: 'No search query provided' });
    }

    // Extract title and location from the query
    const { title, location } = ExtractTitleAndLocation(query);
    console.log('Extracted title and location:', { title, location });

    // Prepare Apollo API parameters
    const apolloParams = {
      api_key: process.env.APOLLO_API_KEY,
      per_page: parseInt(per_page),
      page: parseInt(page)
    };

    if (title) apolloParams.person_titles = [title];
    if (location) apolloParams.person_locations = [location];

    if (!title && !location) {
      return res.status(400).json({
        error: 'Could not extract any searchable information from query',
        query: query
      });
    }

    // Make a single call to Apollo API
    const APOLLO_API_URL = 'https://api.apollo.io/v1/people/search';
    
    try {
      console.log('Making Apollo API request with params:', apolloParams);
      const response = await axios.post(APOLLO_API_URL, apolloParams);
      
      if (!response.data || !response.data.people) {
        return res.status(200).json({
          success: true,
          results: [],
          pagination: {
            page: parseInt(page),
            per_page: parseInt(per_page),
            total: 0
          }
        });
      }

      console.log('Apollo API response received:', {
        status: response.status,
        data: response.data
      });

      // Transform the response to match our frontend expectations
      const transformedLeads = response.data.people.map(person => ({
        id: person.id,
        name: `${person.first_name || ''} ${person.last_name || ''}`.trim(),
        email: person.email,
        phone: person.phone_number,
        company: person.organization?.name || null,
        title: person.title,
        location: person.location,
        website: person.organization?.website_url || null,
        employeeCount: person.organization?.employee_count || null,
        linkedin_url: person.linkedin_url,
        twitter_url: person.twitter_url,
        facebook_url: person.facebook_url,
        owned: false // Default value
      }));

      console.log('Processed leads:', transformedLeads);

      return res.status(200).json({
        success: true,
        results: transformedLeads,
        pagination: {
          page: parseInt(page),
          per_page: parseInt(per_page),
          total: response.data.pagination?.total_entries || transformedLeads.length
        }
      });

    } catch (apolloError) {
      console.error('Apollo API error:', apolloError.response?.data || apolloError.message);
      return res.status(500).json({
        error: 'Failed to retrieve data from Apollo API',
        details: apolloError.response?.data || apolloError.message
      });
    }

  } catch (error) {
    console.error('Error processing search:', error);
    return next(new ErrorHandler('Failed to process search query', 500));
  }
});

exports.SearchLeadsByFilter = catchAsyncError(async (req, res, next) => {
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
          if (lead.id) {
            const enrichedLead = await EnrichLeadWithApollo(lead.id);
            enrichedLeads.push({
              id: lead.id,
              name: enrichedLead.name || `${enrichedLead.first_name || ''} ${enrichedLead.last_name || ''}`.trim(),
              email: enrichedLead.email || null,
              phone: enrichedLead.organization?.phone || null,
              company: enrichedLead.organization?.name || null,
              title: enrichedLead.title || null,
              location: [enrichedLead.city, enrichedLead.state, enrichedLead.country]
                .filter(Boolean)
                .join(', ') || null,
              website: enrichedLead.organization?.website_url || null,
              employeeCount: enrichedLead.organization?.estimated_num_employees || null,
            });
          } else {
            console.warn(`Lead with missing ID skipped: ${JSON.stringify(lead)}`);
          }
        } catch (error) {
          console.error(`Failed to enrich lead with ID ${lead.id}: ${error.message}`);
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