import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getBusinessData, addDocumentData, addWebsiteData, updateBusinessName } from "../services/settingService.js";

export const useSettingQuery = () => {
    const queryClient = useQueryClient();

    const addDocumentMutation = useMutation({
        mutationFn: addDocumentData,
        onSuccess: () => {
            queryClient.invalidateQueries(["business"]);
            toast.success("Document updated successfully");
        },
    });

    const addWebsiteMutation = useMutation({
        mutationFn: addWebsiteData,
        onSuccess: () => {
            queryClient.invalidateQueries(["business"]);
            toast.success("Website updated successfully");
        },
    });

    const updateBusinessNameMutation = useMutation({
        mutationFn: updateBusinessName,
        onSuccess: () => {
            queryClient.invalidateQueries(["business"]);
            toast.success("Business name updated successfully");
        },
    });

    const { data: businessDetails } = useQuery({
        queryKey: ['business'],
        queryFn: getBusinessData,
        enabled: !!JSON.parse(localStorage?.getItem("Token")),
    });

    const handleSubmit = (updatedData) => {
        if (!businessDetails) return;
        const { BusinessName, WebsiteUrls, newDocuments } = updatedData;
        
        // Always update Business Name
        updateBusinessNameMutation.mutate({ BusinessName });
        if (WebsiteUrls.length > 0) {
            addWebsiteMutation.mutate({ WebsiteUrls: WebsiteUrls });
        } else {
            toast.error("Please provide at least one website URL");
            return;
        }
        // Only send document update if new documents are provided
        if (newDocuments.length > 0) {
            const formData = new FormData();
            newDocuments.forEach((file) => {
                formData.append('documents', file);
            });
            addDocumentMutation.mutate(formData);
        } else {
            toast.error("Please upload at least one new document");
            return;
        }
    };

    const isLoadingAddDoc = addDocumentMutation.isPending;
    const isLoadingBusinessName = updateBusinessNameMutation.isPending;
    const isLoadingWebUrl = addWebsiteMutation.isPending;


    return {
        businessDetails,
        addDocumentMutation,
        addWebsiteMutation,
        updateBusinessNameMutation,
        handleSubmit,
        isLoadingAddDoc,
        isLoadingBusinessName,
        isLoadingWebUrl 
    };
};
