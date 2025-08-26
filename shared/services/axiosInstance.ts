import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://morago-test.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const publicEndpoints = ["/auth/register", "/auth/login"];
  const isPublic = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
