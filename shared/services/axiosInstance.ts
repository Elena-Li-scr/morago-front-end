import axios from "axios";
import { useModalStore } from "@shared/store/useStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { setLoading } = useModalStore.getState();
  setLoading(true);
  const token = localStorage.getItem("token");
  const publicEndpoints = ["/auth/register", "/auth/login"];
  const isPublic = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    setTimeout(() => useModalStore.getState().setLoading(false), 150);
    return response;
  },
  (error) => {
    setTimeout(() => useModalStore.getState().setLoading(false), 150);
    return Promise.reject(error);
  },
);

export default axiosInstance;
