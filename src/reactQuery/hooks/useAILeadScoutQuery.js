import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { searchLeads } from "../services/aiLeadScoutService";

export const useAILeadScoutQuery = (data) => {
  const queryClient = useQueryClient();

  const {
    data: allLeads, 
    isLoading: isLeadsLoading,
    error: leadsError,
    refetch
  } = useQuery({
    queryKey: ["allLeads"],
    queryFn: searchLeads(data),
    onSuccess: (data) => console.log("All leads fetched:", data),
  });

  return {
    allLeads,
    isLeadsLoading,
    leadsError,
    refetch
  };

};