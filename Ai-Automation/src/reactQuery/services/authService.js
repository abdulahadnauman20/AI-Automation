import { axiosInstance } from "../../api/axios.js";

export const signupUser = (userData) => axiosInstance.post("/user/Signup", userData).then(res => res.data);
export const loginUser = (userData) => axiosInstance.post("/User/Login", userData).then(res => res.data);
export const logoutUser = () => axiosInstance.post("/user/logout").then(res => res.data);
export const verifyOtp = (otp) => axiosInstance.post("/user/VerifyCode", otp).then(res => res.data);
export const forgotPassword = (userData) => axiosInstance.put("/user/ForgetPassword", userData).then(res => res.data);
export const resetPassword = (userData) => axiosInstance.put("/user/ResetPassword", userData).then(res => res.data);
export const getUserInfo = () => axiosInstance?.get("/user/GetUserDetails").then(res => res.data);
export const updatePassword = (userData) => axiosInstance.put("/user/UpdatePassword", userData).then(res => res.data);
export const updateProfile = (userData) => axiosInstance.put("/user/UpdateUserDetails", userData).then(res => res.data);
export const switchTFA = () => axiosInstance.put("/user/SwitchTFA").then(res => res.data);