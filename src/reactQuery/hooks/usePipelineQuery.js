
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllLeads, updateLeadStatus } from "../services/pipelineService";

export const usePipelineQuery = () => {
    const queryClient = useQueryClient();

    // Query to fetch all leads
    const { data: allLeads } = useQuery({
        queryKey: ["allLeads"],
        queryFn: getAllLeads,
        onSuccess: (data) => console.log("All leads fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch leads"),
    });

    // Mutation to update the lead status
    const { mutate: changeLeadStatus} = useMutation({
        mutationFn: updateLeadStatus,
        onSuccess: (data) => {
            toast.success("Lead status updated successfully");
            // Optionally refetch the leads after successful status update
            queryClient.invalidateQueries(["allLeads"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update lead status");
        },
    });

    return {
        allLeads,
        changeLeadStatus, 
    };
};
