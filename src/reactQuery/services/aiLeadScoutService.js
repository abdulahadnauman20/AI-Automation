import { axiosInstance } from "../../api/axios";

export const searchLeads = async ({ query, page, per_page, person_titles, industries }) => {
  try {
    console.log('Searching leads with params:', { query, page, per_page, person_titles, industries });
    const response = await axiosInstance.post("/lead/SearchLeads", {
      query: query || "all",
      page,
      per_page,
      ...(person_titles && person_titles.length > 0 ? { person_titles } : {}),
      ...(industries && industries.length > 0 ? { industries } : {}),
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in searchLeads:', JSON.stringify(error.response?.data || error, null, 2));
    throw error;
  }
};