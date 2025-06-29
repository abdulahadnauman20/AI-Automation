import { axiosInstance } from "../../api/axios.js";

export const getBusinessData = () => axiosInstance.get("/business/GetBusinessData").then(res => res.data);
export const addWebsiteData = (userData) => axiosInstance.put("/business/AddWebsiteData", userData).then(res => res.data);
export const addDocumentData = (formData) => 
    axiosInstance.put("/business/AddDocumentData", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
}).then(res => res.data);
export const updateBusinessName = (userData) => axiosInstance.put("/business/UpdateBusinessName", userData).then(res => res.data);