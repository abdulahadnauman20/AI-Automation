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

  const getCampaignSequenceQuery = (campaignId) => {
    return useQuery({
      queryKey: ["campaignSequence", campaignId],
      queryFn: () => getCampaignSequence(campaignId), // Fetch the sequence data
      enabled: !!campaignId, // Only run the query if campaignId is valid
      onSuccess: (sequence) => console.log("Campaign sequence fetched:", sequence),
      onError: (error) => toast.error(`Failed to fetch campaign sequence: ${error.message}`),
    });
  };

  const { mutate: updateCampaignSequenceMutation, isLoading: isUpdatingCampaignSequence } = useMutation({
    mutationFn: ({ campaignId, sequenceData }) => updateCampaignSequence(campaignId, sequenceData),
    onSuccess: (data) => {
      console.log("Campaign sequence updated successfully:", data);
      toast.success("Campaign sequence updated successfully!");
      // No automatic state update — leave it to the component if needed
    },
    onError: (error) => {
      toast.error(`Failed to update campaign sequence: ${error.message}`);
      console.log(error);
    },
  });
  

  const sendMailMutation = useMutation({
    mutationFn: ({ campaignId, data }) => sendCampaignMail(campaignId, data),
    onSuccess: () => toast.success("Email sent"),
    onError: () => toast.error("Failed to send email"),
  });

  const { mutate: generateEmailWithAI, isLoading: isGeneratingAI } = useMutation({
    mutationFn: ({ campaignId, emailData }) => generateAIEmail(campaignId, emailData),
    onSuccess: (data) => {
      console.log("AI Email generated successfully:", data);
      // We won't directly update the state here. We'll return the data to the component for handling.
    },
    onError: (error) => {
      toast.error(`Failed to generate AI email: ${error.message}`);
      console.log(error);
    },
  });

  const { mutate: generateSequenceWithAI, isLoading: isGeneratingSequence } = useMutation({
    mutationFn: ({ campaignId, sequenceData }) => generateAISequence(campaignId, sequenceData),
    onSuccess: (data) => {
      console.log("AI Sequence generated successfully:", data);
      // We won't directly update the state here. We'll return the data to the component for handling.
    },
    onError: (error) => {
      toast.error(`Failed to generate AI sequence: ${error.message}`);
      console.log(error);
    },
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
    getCampaignLeadsQuery,

    // Sequence
    getCampaignSequenceQuery,
    sendMailMutation,

    generateEmailWithAI,
    isGeneratingAI,
    generateSequenceWithAI,
    isGeneratingSequence,
    updateCampaignSequenceMutation,
    isUpdatingCampaignSequence,
    

    // Schedule
    getCampaignSchedule,
    updateScheduleMutation,
    generateAISchedule,
  };
};
