// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { searchLeads } from "../services/aiLeadScoutService";

// export const useAILeadScoutQuery = (data) => {
//   const queryClient = useQueryClient();

//   const {
//     data: allLeads, 
//     isLoading: isLeadsLoading,
//     error: leadsError,
//     refetch
//   } = useQuery({
//     queryKey: ["allLeads"],
//     queryFn: searchLeads(data),
//     onSuccess: (data) => console.log("All leads fetched:", data),
//   });

//   return {
//     allLeads,
//     isLeadsLoading,
//     leadsError,
//     refetch
//   };

// };

import { useQuery } from "@tanstack/react-query";
import { searchLeads } from "../services/aiLeadScoutService";

export const useAILeadScoutQuery = (query, page, per_page) => {
  return useQuery({
    queryKey: ["leads", query, page, per_page],
    queryFn: async () => {
      console.log('useAILeadScoutQuery called with:', { query, page, per_page });
      const result = await searchLeads({ query, page, per_page });
      console.log('Query result:', result);
      return result;
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
