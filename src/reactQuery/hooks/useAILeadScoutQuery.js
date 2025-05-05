import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { searchLeads } from "../services/emailAccountsService";

export const useAILeadScoutQuery = () => {
  const queryClient = useQueryClient();

  const {
    data: allLeads, 
    isLoading: isLeadsLoading,
    error: leadsError,
  } = useQuery({
    queryKey: ["allLeads"],
    queryFn: searchLeads,
    onSuccess: (data) => console.log("All leads fetched:", data),
  });

  return {
    allLeads,
    isLeadsLoading,
    leadsError,
  };

};