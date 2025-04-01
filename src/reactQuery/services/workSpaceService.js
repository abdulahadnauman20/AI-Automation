import { axiosInstance } from "../../api/axios.js";

// workspace route work
export const createWorkspace = (userData) => axiosInstance.post("/workspace/CreateWorkspace", userData).then(res => res.data); //
export const updateWorkspace = (userData) => axiosInstance.put("/workspace/UpdateWorkspace", userData).then(res => res.data);  //
export const switchWorkspace = (userData) => axiosInstance.put("/workspace/SwitchWorkspace", userData).then(res => res.data); //
export const getAllWorkspace = () => axiosInstance.get("/workspace/GetAllUserWorkspace").then(res => res.data); //
export const getCurrentWorkspace = () => axiosInstance.get("/workspace/GetCurrentWorkspace").then(res => res.data);

export const addMemeber = (userData) => axiosInstance.post("/member/AddMember", userData).then(res => res.data); //
export const getWorkspaceMember = () => axiosInstance.get("/member/GetWorkspaceMembers").then(res => res.data); 
export const acceptInvitation = (userData) => axiosInstance.put("/member/AcceptInvitation", userData).then(res => res.data); 
export const rejectInvitation = (userData) => axiosInstance.put("/member/RejectInvitation", userData).then(res => res.data); 
export const verifyInvitation = () => axiosInstance.get("/member/VerifyInvitation").then(res => res.data); 

// support route work
export const helpDesk = (userData) => axiosInstance.post("/help/AddFeedback", userData, {
    headers: { "Content-Type": "multipart/form-data" },
}).then(res => res.data);
