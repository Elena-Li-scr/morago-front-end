import axios from "axios";

const instance = axios.create({
  baseURL: "https://morago.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const isPublicEndpoint =
    config.url?.includes("/auth/register") ||
    config.url?.includes("/auth/login");

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
