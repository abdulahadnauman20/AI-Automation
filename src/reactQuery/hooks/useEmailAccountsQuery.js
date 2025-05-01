import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
    getEmailAccounts
} from "../services/emailAccountsService";

export const useCampaignQuery = () => {
  const queryClient = useQueryClient();

  const {
    data: emailAccountsObject, 
    isLoading: isEmailAccountsLoading,
    error: emailAccountsError,
  } = useQuery({
    queryKey: ["emailAccounts"],
    queryFn: getEmailAccounts,
    onSuccess: (data) => console.log("All email accounts fetched:", data),
  });

  return {
    emailAccountsObject,
    isEmailAccountsLoading,
    emailAccountsError,
  };

};