import axios from "axios";
import { useModalStore } from "../components/loading/useModalStore";

const baseURL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { setLoading } = useModalStore.getState();
  setLoading(true);
  const token = localStorage.getItem("accessToken");
  const publicEndpoints = ["/auth/register", "/auth/login"];
  const isPublic = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { setLoading, setSuccess } = useModalStore.getState();
    // 1. Показываем loading
    setLoading(true);
    setTimeout(() => {
      // 2. Убираем loading
      setLoading(false);
      // 3. Показываем success
      setSuccess(true);
    }, 2000); // Задержка для лоадера
    return response.data;
  },
  (error) => {
    setTimeout(() => {
      useModalStore.getState().setLoading(false);
    }, 2000);
    return Promise.reject(error);
  },
);

export default axiosInstance;
