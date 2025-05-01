import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
    getEmailAccounts
} from "../services/emailAccountsService";

export const useCampaignQuery = () => {
  const queryClient = useQueryClient();

  const getEmailAccountsQuery = () => useQuery({
    queryKey: ["email-accounts"],
    queryFn: () => getEmailAccounts(),
  });

  return {

  };

};