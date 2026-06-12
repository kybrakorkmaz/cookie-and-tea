import axios from "axios";

// Pull the correct environment variable injected automatically by Vite
const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

// Create a custom instance with global configuration parameters
const apiClient = axios.create({
    baseURL: baseUrl,
    timeout: 10000, // Safe standard: cancels requests if server takes longer than 10 secs
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
// add Request Interceptors here later
// to automatically attach JWT authorization headers from localStorage
apiClient.interceptors.request.use(
    (config) =>{
        // const token = localStorage.getItem("token");
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
)

export default apiClient;