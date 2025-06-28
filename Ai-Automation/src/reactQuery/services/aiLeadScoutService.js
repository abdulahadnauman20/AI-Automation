import { axiosInstance } from "../../api/axios";

export const searchLeads = async ({ query, page, per_page, person_titles, industries, locations, employees, revenues, technologies, fundingTypes, names, companies }) => {
  console.log('=== searchLeads function called ===');
  console.log('Parameters received:', { query, page, per_page, person_titles, industries, locations, employees, revenues, technologies, fundingTypes, names, companies });
  console.log('Names parameter type:', typeof names);
  console.log('Names parameter value:', names);
  console.log('Names is array:', Array.isArray(names));
  console.log('Companies parameter type:', typeof companies);
  console.log('Companies parameter value:', companies);
  console.log('Companies is array:', Array.isArray(companies));
  
  try {
    console.log('Searching leads with params:', { query, page, per_page, person_titles, industries, locations, employees, revenues, technologies, fundingTypes, names, companies });
    
    // Build the query string to include location if provided
    let searchQuery = query || "all";
    if (locations && locations.length > 0) {
      // Convert location to title case for better matching
      const formattedLocations = locations.map(loc => 
        loc.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
      );
      searchQuery = `${searchQuery} in ${formattedLocations.join(', ')}`;
    }
    
    const requestBody = {
      query: searchQuery,
      page,
      per_page,
      ...(person_titles && person_titles.length > 0 ? { person_titles } : {}),
      ...(industries && industries.length > 0 ? { industries } : {}),
      ...(locations && locations.length > 0 ? { locations } : {}),
      ...(employees && employees.length > 0 ? { employees } : {}),
      ...(revenues && revenues.length > 0 ? { revenues } : {}),
      ...(technologies && technologies.length > 0 ? { technologies } : {}),
      ...(fundingTypes && fundingTypes.length > 0 ? { funding_types: fundingTypes } : {}),
      ...(names && names.length > 0 ? { names } : {}),
      ...(companies && companies.length > 0 ? { companies } : {}),
    };
    console.log('Request body being sent:', requestBody);
    console.log('Names in request body:', requestBody.names);
    console.log('Companies in request body:', requestBody.companies);
    console.log('API URL:', import.meta.env.VITE_API_URL);
    
    const response = await axiosInstance.post("/lead/SearchLeads", requestBody);
    console.log('API Response:', response.data);
    console.log('API Response results length:', response.data?.results?.length || 0);
    console.log('API Response pagination:', response.data?.pagination);
    
    // Log a few sample results to see if they match the filters
    if (response.data?.results && response.data.results.length > 0) {
      console.log('Sample results:');
      response.data.results.slice(0, 3).forEach((lead, index) => {
        console.log(`Sample ${index + 1}:`, {
          name: lead.person?.name,
          title: lead.person?.title,
          company: lead.person?.organization?.name,
          location: `${lead.person?.city}, ${lead.person?.state}, ${lead.person?.country}`,
          industry: lead.person?.organization?.industry
        });
      });
    }
    
    return response.data;
  } catch (error) {
    console.error('Error in searchLeads:', JSON.stringify(error.response?.data || error, null, 2));
    throw error;
  }
};