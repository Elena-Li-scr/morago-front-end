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

export async function getAdminUsers(page: number, size: number, keyword: string) {
  const res = await axiosInstance.get("/admin/users", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
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

export async function getAdminTranslators(page: number, size: number, keyword: string) {
  const res = await axiosInstance.get("/admin/translators", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
  });
  return res;
}

export async function getTranslatorById(id: string | number) {
  const res = await axiosInstance.get(`/admin/translators/${id}`);
  return res;
}

export async function getAdminCategories(page?: number, size?: number, keyword?: string) {
  const res = await axiosInstance.get("/admin/categories", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
  });
  return res;
}

export const getCategoryById = (id: number | string) => {
  const res = axiosInstance.get<Category>(`/admin/categories/${id}`);
  return res;
};

export async function postAdminCategories(name: string) {
  const res = await axiosInstance.post("/admin/categories", { name, isActive: "true" });
  return res;
}

type AdminThemes = {
  name?: string;
  title?: string;
  description?: string;
  price?: number;
  nightPrice: number;
  isPopular: boolean;
  isActive: boolean;
  iconId?: number;
  categoryId?: number;
};
export type PageResponse<T> = {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export async function getAdminThemes(page: number, size: number, keyword: string) {
  const res = await axiosInstance.get<PageResponse<AdminThemes>>("/admin/themes", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
  });
  return res;
}

export async function postAdminThemes(data: AdminThemes) {
  const res = await axiosInstance.post("/admin/themes", data);
  return res;
}

type AddIcon = {
  formData: FormData;
  id: number | string;
};

export async function postAdminThemesIcon({ formData, id }: AddIcon) {
  const res = await axiosInstance.post(`/admin/themes/${id}/icon`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

export const getThemeById = (id: number | string) => {
  const res = axiosInstance.get(`/admin/themes/${id}`);
  return res;
};

export const updateTheme = (id: number | string, data: AdminThemes) => {
  const res = axiosInstance.put(`/admin/themes/update/${id}`, data);
  return res;
};

export type CategoryReq = {
  name: string;
  isActive: boolean;
};

export const updateCategory = (id: number | string, data: CategoryReq) => {
  const res = axiosInstance.put(`/admin/categories/${id}`, data);
  return res;
};
