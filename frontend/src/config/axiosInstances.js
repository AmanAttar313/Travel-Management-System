import axios from "axios"



export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. "http://localhost:4000"
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Try to send cookies automatically
});

//  Add request interceptor to attach token from localStorage if cookies not used
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // your JWT or session token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` || " "; // standard format
    }
    return config;
  },
  (error) => Promise.reject(error)
);




