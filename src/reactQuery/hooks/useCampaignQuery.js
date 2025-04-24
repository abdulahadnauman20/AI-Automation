import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getCampaignLeads,
  getCampaignSequence,
  updateCampaignSequence,
  sendCampaignMail,
  generateAIEmail,
  generateAISequence,
  getCampaignSchedule,
  updateCampaignSchedule,
  generateAISchedule,
  getAllCampaigns,
  createCampaign,
  updateCampaign,
  getCampaignById,
  deleteCampaign,
  activePauseCampaign,
  runCampaign,
} from "../services/campaignService";

export const useCampaignQuery = () => {
  const queryClient = useQueryClient();

  // -------------------- Campaign CRUD --------------------
  const {
    data: campaignsObject, 
    isLoading: isCampaignsLoading,
    error: campaignsError,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: getAllCampaigns,
    onSuccess: (data) => console.log("All campaigns fetched:", data),
  });

  const createCampaignMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      toast.success("Campaign created");
      queryClient.invalidateQueries(["campaigns"]);
    },
    onError: () => toast.error("Failed to create campaign"),
  });

  const updateCampaignMutation = useMutation({
    mutationFn: ({ campaignId, data }) => updateCampaign(campaignId, data),
    onSuccess: () => {
      toast.success("Campaign updated");
      queryClient.invalidateQueries(["campaigns"]);
    },
    onError: () => toast.error("Failed to update campaign"),
  });  

  const deleteCampaignMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      toast.success("Campaign deleted");
      queryClient.invalidateQueries(["campaigns"]);
    },
    onError: () => toast.error("Failed to delete campaign"),
  });

  const activePauseMutation = useMutation({
    mutationFn: activePauseCampaign,
    onSuccess: () => toast.success("Campaign status updated"),
    onError: () => toast.error("Failed to update campaign status"),
  });

  const runCampaignMutation = useMutation({
    mutationFn: runCampaign,
    onSuccess: () => toast.success("Campaign started"),
    onError: () => toast.error("Failed to start campaign"),
  });

  // -------------------- Sequence --------------------
  const updateSequenceMutation = useMutation({
    mutationFn: ({ campaignId, data }) => updateCampaignSequence(campaignId, data),
    onSuccess: () => {
      toast.success("Sequence updated");
      queryClient.invalidateQueries(["campaignSequence"]);
    },
    onError: () => toast.error("Failed to update sequence"),
  });
  

  const sendMailMutation = useMutation({
    mutationFn: ({ campaignId, data }) => sendCampaignMail(campaignId, data),
    onSuccess: () => toast.success("Email sent"),
    onError: () => toast.error("Failed to send email"),
  });
  

  // -------------------- Schedule --------------------
  const updateScheduleMutation = useMutation({
    mutationFn: ({ campaignId, data }) => updateCampaignSchedule(campaignId, data),
    onSuccess: () => {
      toast.success("Schedule updated");
      queryClient.invalidateQueries(["campaignSchedule"]);
    },
    onError: () => toast.error("Failed to update schedule"),
  });

  const getCampaignLeadsQuery = (campaignId) => useQuery({
    queryKey: ["campaignLeads", campaignId],
    queryFn: async () => {
      const response = await getCampaignLeads(campaignId);
      return response.leads; // Directly return the leads array
    },
    enabled: !!campaignId,
    onSuccess: (leads) => console.log("Campaign leads fetched:", leads),
  });

  return {
    // Data
    campaignsObject,
    isCampaignsLoading,
    campaignsError,

    // Campaign Mutations
    createCampaignMutation,
    updateCampaignMutation,
    deleteCampaignMutation,
    activePauseMutation,
    runCampaignMutation,
    getCampaignById,

    // Leads
    // getCampaignLeads,
    getCampaignLeadsQuery,

    // Sequence
    getCampaignSequence,
    updateSequenceMutation,
    sendMailMutation,
    generateAIEmail,
    generateAISequence,

    // Schedule
    getCampaignSchedule,
    updateScheduleMutation,
    generateAISchedule,
  };
};
