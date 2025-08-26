import axiosInstance from "../axios-config";
import type { Category } from "../../types/types";

export type AuthResponse = {
  token: string;
  id: number;
  role: string;
  phone: string;
};

export type RegisterAdmin = {
  phone: string;
  password: string;
};

export async function getAdminUsers() {
  const res = await axiosInstance.get("/admin/users", {
    params: { page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
  });
  return res;
}

// Login
export const LoginAdmin = async (data: RegisterAdmin): Promise<AuthResponse> => {
  console.log(data);
  return axiosInstance.post("/auth/login", { ...data });
};

export const getUserById = (id: number | string) => {
  return axiosInstance.get(`/admin/users/${id}`);
};

export async function getAdminTranslators() {
  const res = await axiosInstance.get("/admin/translators", {
    params: { page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
  });
  return res;
}

export async function getTranslatorById(id: string | number) {
  const res = await axiosInstance.get(`/admin/translators/${id}`);
  return res;
}

export async function getAdminCategories() {
  const res = await axiosInstance.get("/admin/categories", {
    params: { page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
  });
  return res;
}

export const getCategoryById = (id: number) => {
  const res = axiosInstance.get<Category>(`/admin/categories/${id}`);
  return res;
};

export async function postAdminCategories(name: string) {
  const res = await axiosInstance.post("/admin/categories", { name, isActive: "true" });
  return res;
}

export async function getAdminThemes() {
  const res = await axiosInstance.get("/admin/themes", {
    params: { page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
  });
  return res;
}

type AdminThemes = {
  name?: string;
  title?: string;
  description?: string;
  price: number;
  nightPrice: number;
  isPopular: boolean;
  isActive: boolean;
  iconId?: number;
  categoryId?: number;
};

export async function postAdminThemes(data: AdminThemes) {
  const res = await axiosInstance.post("/admin/themes", data);
  return res;
}

export const getThemeById = (id: number | string) => {
  const res = axiosInstance.get(`/admin/themes/${id}`);
  return res;
};
