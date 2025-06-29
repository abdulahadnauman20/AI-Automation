import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const token1 = token?.token || token 
    if (token1) {
      config.headers.Authorization = `Bearer ${token1}`;
    }
    return config;
  }, (error) => Promise.reject(error));
  