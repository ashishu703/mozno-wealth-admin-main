// api/axios.instance.js
import axios from "axios";

const adminClient = axios.create({
  baseURL:
    import.meta.env.VITE_ADMIN_API_BASE_URL ||
    "http://localhost:3000/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
adminClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default adminClient;
