import { axiosInstance } from "../../api/axios.js";

export const getAllLeads = () => axiosInstance.get("/lead/GetAllLeads").then(res => res.data);
export const updateLeadStatus = (leadData) => axiosInstance.patch(`/lead/UpdateLeadStatus/${leadData.id}`, {status: leadData.status}).then(res => res.data);