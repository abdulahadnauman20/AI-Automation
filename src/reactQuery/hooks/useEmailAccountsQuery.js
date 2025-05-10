import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
    getEmailAccounts,
    getDomainSuggestions,
    getDomainPricing,
} from "../services/emailAccountsService";

export const useEmailAccountQuery = () => {
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

  const getDomainSuggestionsMutation = useMutation({
    mutationFn: (data) => {
      console.log("Data passed to getDomainSuggestions mutation:", data);
      return getDomainSuggestions(data); // Assuming this function handles the API call
    },
    onSuccess: (data) => {
      console.log("Domain suggestions fetched:", data);
      toast.success("Domain suggestions fetched");
    },
    onError: (error) => {
      console.log("Domain suggestions error:", error);
      toast.error("Failed to fetch domain suggestions");
    },
  });

  const getDomainPricingMutation = useMutation({
    mutationFn: (data) => getDomainPricing(data),
    onSuccess: (data) => {
      console.log("Domain pricing fetched:", data);
      toast.success("Domain pricing fetched");
    },
    onError: (error) => {
      console.log("Domain pricing error:", error);
      toast.error("Failed to fetch domain pricing");
    },
  });

  return {
    emailAccountsObject,
    isEmailAccountsLoading,
    emailAccountsError,

    getDomainSuggestionsMutation,
    getDomainPricingMutation,
  };

};