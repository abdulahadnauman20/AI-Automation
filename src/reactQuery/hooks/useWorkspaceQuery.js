import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createWorkspace, getAllWorkspace, updateWorkspace, getCurrentWorkspace, switchWorkspace, addMemeber, getWorkspaceMember, acceptInvitation, rejectInvitation, verifyInvitation, helpDesk } from "../services/workSpaceService.js";
import { useParams } from "react-router-dom";

export const useWorkspaceQuery = () => {
    const {wkid, usid} = useParams();
    console.log( wkid, usid);

    const queryClient = useQueryClient();
    
    const createWorkspaceMutation = useMutation({
        mutationFn: createWorkspace,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["currentWorkspace"]);
            queryClient.invalidateQueries(["allWorkspace"]);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to create workspace"),
    });

    const addMemeberMutation = useMutation({
        mutationFn: addMemeber,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["currentWorkspace"]);
            queryClient.invalidateQueries(["allWorkspace"]);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to create workspace"),
    });

    const updateWorkspaceMutation = useMutation({
        mutationFn: updateWorkspace, // Fixed function name
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["currentWorkspace"]); // ✅ Refreshes the current workspace data
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to update workspace"), // ✅ Fixed error message
    });
    

    const switchWorkspaceMutation = useMutation({
        mutationFn: switchWorkspace,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["currentWorkspace"]);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to switch workspace"),
    });

    const { data: currentWorkspace } = useQuery({
        queryKey: ["currentWorkspace"],
        queryFn: getCurrentWorkspace,
        refetchOnWindowFocus: false,
        enabled: !!JSON.parse(localStorage.getItem("user")), // Fetch only if user exists
        onSuccess: (data) => console.log("Current workspace fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch workspace"),
    });

    const { data: allWorkspace } = useQuery({
        queryKey: ["allWorkspace"],
        queryFn: getAllWorkspace,
        refetchOnWindowFocus: false,
        enabled: !!JSON.parse(localStorage.getItem("user")), // Fetch only if user exists
        onSuccess: (data) => console.log("All workspaces fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch workspaces"),
    });

    const { data: teamWorkspaceMember } = useQuery({
        queryKey: ["teamWorkspaceMember"],
        queryFn: getWorkspaceMember,
        refetchOnWindowFocus: false,
        enabled: !!JSON.parse(localStorage.getItem("user")),
        onSuccess: (data) => console.log("All workspaces fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch workspaces"),
    });


    const { data: verifyMemberInvitation } = useQuery({
        queryKey: ["verifyMemberInvitation"],
        queryFn: verifyInvitation,
        refetchOnWindowFocus: false,
        enabled: !! wkid && usid,
        onSuccess: (data) => console.log("All workspaces fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch workspaces"),
    });


    const acceptInvitationMutation = useMutation({
        mutationFn: acceptInvitation,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to send help desk email"),
    });

    const rejectInvitationMutation = useMutation({
        mutationFn: rejectInvitation,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to send help desk email"),
    });




    const helpDeskMutation = useMutation({
        mutationFn: helpDesk,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to send help desk email"),
    });

    return { createWorkspaceMutation, switchWorkspaceMutation, currentWorkspace, allWorkspace, updateWorkspaceMutation, addMemeberMutation, teamWorkspaceMember, helpDeskMutation, acceptInvitationMutation, rejectInvitationMutation,   verifyMemberInvitation};
};
//
