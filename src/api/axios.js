import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));
  