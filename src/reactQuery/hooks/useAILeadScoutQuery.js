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
    queryKey: ["allLeads", data.query, data.page], // Add search query and page to the query key
    queryFn: () => searchLeads(data), // Make sure it's a function, not the result of a function call
    onSuccess: (data) => {
      console.log("All leads fetched:", data);
    },
    onError: (error) => {
      console.error("Error fetching leads:", error);
    },
  });

  return {
    allLeads,
    isLeadsLoading,
    leadsError,
    refetch
  };
};
