import { axiosInstance } from "../../api/axios";

// -------------------- People --------------------
export const getCampaignLeads = (campaignId) =>
  axiosInstance.get(`/campaign/GetCampaignLeads/${campaignId}/people`).then(res => res.data);

// -------------------- Sequence --------------------
export const getCampaignSequence = (campaignId) =>
  axiosInstance.get(`/campaign/GetCampaignSequence/${campaignId}/sequence`).then(res => res.data);

export const updateCampaignSequence = (campaignId, data) =>
  axiosInstance.put(`/campaign/UpdateCampaignSequence/${campaignId}/sequence`, data).then(res => res.data);

export const sendCampaignMail = (campaignId, data) =>
  axiosInstance.put(`/campaign/SendCampaignMail/${campaignId}/sequence`, data).then(res => res.data);

export const generateAIEmail = (campaignId) =>
  axiosInstance.get(`/campaign/GenerateAIEmail/${campaignId}/sequence`).then(res => res.data);

export const generateAISequence = (campaignId) =>
  axiosInstance.get(`/campaign/GenerateAISequence/${campaignId}/sequence`).then(res => res.data);

// -------------------- Schedule --------------------
export const getCampaignSchedule = (campaignId) =>
  axiosInstance.get(`/campaign/GetCampaignSchedule/${campaignId}/schedule`).then(res => res.data);

export const updateCampaignSchedule = (campaignId, data) =>
  axiosInstance.put(`/campaign/UpdateCampaignSchedule/${campaignId}/schedule`, data).then(res => res.data);

export const generateAISchedule = (campaignId) =>
  axiosInstance.get(`/campaign/GenerateAISchedule/${campaignId}/schedule`).then(res => res.data);

// -------------------- Campaign CRUD --------------------
export const getAllCampaigns = () =>
  axiosInstance.get("/campaign/getallcampaigns").then(res => res.data);

export const createCampaign = (data) =>
  axiosInstance.post("/campaign/CreateCampaign", data).then(res => res.data);

export const updateCampaign = (campaignId, data) =>
  axiosInstance.put(`/campaign/UpdateCampaign/${campaignId}`, data).then(res => res.data);

export const getCampaignById = (campaignId) =>
  axiosInstance.get(`/campaign/GetCampaignById/${campaignId}`).then(res => res.data);

export const deleteCampaign = (campaignId) =>
  axiosInstance.delete(`/campaign/DeleteCampaign/${campaignId}`).then(res => res.data);

export const activePauseCampaign = (campaignId) =>
  axiosInstance.put(`/campaign/ActivePauseCampaign/${campaignId}`).then(res => res.data);

export const runCampaign = (campaignId) =>
  axiosInstance.put(`/campaign/RunCampaign/${campaignId}`).then(res => res.data);
