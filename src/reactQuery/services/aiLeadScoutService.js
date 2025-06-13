import { axiosInstance } from "../../api/axios";

export const searchLeads = async ({ query, page, per_page }) => {
  try {
    console.log('Searching leads with params:', { query, page, per_page });
    const response = await axiosInstance.post("/lead/SearchLeads", {
      query,
      page,
      per_page,
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in searchLeads:', error.response?.data || error.message);
    throw error;
  }
};