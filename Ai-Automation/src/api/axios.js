import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  // Try to get the token from localStorage, checking for both 'Token' and 'token' keys
  const storedToken = localStorage.getItem("Token") || localStorage.getItem("token");
  let token = null;

  if (storedToken) {
    try {
      // First, assume it's a JSON object like {"token": "..."}
      const tokenObject = JSON.parse(storedToken);
      token = tokenObject?.token || tokenObject;
    } catch (e) {
      // If parsing fails, it's likely a plain token string
      token = storedToken;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => Promise.reject(error));
  