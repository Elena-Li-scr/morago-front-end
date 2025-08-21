import { compareDesc, parseISO } from "date-fns";
import axiosInstance from "../axios-config";

export type AuthResponse = {
  token: string;
  id: number;
  role: string;
  phone: string;
};

export type RegisterAdmin = {
  email: string;
  password: string;
};

// Login
export const LoginAdmin = async (data: RegisterAdmin) => {
  console.log(data);
  return axiosInstance.post("/auth/login", { ...data, role: "ROLE_ADMIN" });
};

type AdminUsersParams = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
  keyword?: string;
  isDebtor?: boolean;
  hasDeposit?: boolean;
};

export async function getAdminTranslators() {
  const res = await axiosInstance.get("/admin/translators", {
    params: { page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
  });
  return res;
}

export async function getTranslatorById(id: string | number) {
  const res = await axiosInstance.get(`/admin/translators/${id}`);
  console.log(res);
  return res;
}
export const getUserById = (id: number | string) =>
  axiosInstance.get(`/admin/users/${id}`).then((r) => r.data);
export const getThemeById = (id: number | string) =>
  axiosInstance.get(`/admin/translation-topics/themes/${id}`).then((r) => r.data);
export const getCategoryById = (id: number | string) =>
  axiosInstance.get(`/admin/translation-topics/categories/${id}`).then((r) => r.data);
