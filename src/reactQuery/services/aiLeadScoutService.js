import { axiosInstance } from "../../api/axios";

export const searchLeads = (data) => axiosInstance.get("/lead/SearchLeads", data).then(res => res.data);