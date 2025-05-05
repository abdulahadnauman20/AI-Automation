import { axiosInstance } from "../../api/axios";

export const searchLeads = (data) => axiosInstance.post("/lead/SearchLeads", data).then(res => res.data);