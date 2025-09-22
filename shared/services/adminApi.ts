import axiosInstance from "../services/axiosInstance";
import {
  type CallHistory,
  type Categories,
  type Category,
  type PageResponse,
  type RequestPage,
  type Themes,
  type Translator,
  type User,
} from "../types/adminTypes.ts";

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

export async function getAdminUsers(
  page: number,
  size: number,
  keyword?: string,
  opts?: { signal?: AbortSignal },
) {
  return await axiosInstance.get<PageResponse<User>>("/admin/users", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
    signal: opts?.signal,
  });
}

// Login
export const LoginAdmin = async (data: RegisterAdmin): Promise<AuthResponse> => {
  return axiosInstance.post("/auth/login", { ...data });
};

export const getUserById = (id: number | string) => {
  return axiosInstance.get(`/admin/users/${id}`);
};

export async function getAdminTranslators(
  page: number,
  size: number,
  keyword: string,
  opts?: { signal?: AbortSignal },
) {
  return await axiosInstance.get<PageResponse<Translator>>("/admin/translators", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
    signal: opts?.signal,
  });
}

export async function getTranslatorById(id: string | number) {
  return await axiosInstance.get(`/admin/translators/${id}`);
}

export async function getAdminCategories(
  page?: number,
  size?: number,
  keyword?: string,
  opts?: { signal?: AbortSignal },
) {
  return await axiosInstance.get<PageResponse<Categories>>("/admin/categories", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
    signal: opts?.signal,
  });
}

export const getCategoryById = (id: number | string) => {
  return axiosInstance.get<Category>(`/admin/categories/${id}`).then((res) => res.data);
};

export async function postAdminCategories(name: string) {
  return await axiosInstance.post("/admin/categories", { name, isActive: "true" });
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

export async function getAdminThemes(
  page: number,
  size: number,
  keyword: string,
  opts?: { signal?: AbortSignal },
) {
  return await axiosInstance.get<PageResponse<Themes>>("/admin/themes", {
    params: { page, size, sortBy: "id", keyword, sortDirection: "ASC" },
    signal: opts?.signal,
  });
}

export async function postAdminThemes(data: AdminThemes) {
  return await axiosInstance.post("/admin/themes", data);
}

type AddIcon = {
  formData: FormData;
  id: number | string;
};

export async function postAdminThemesIcon({ formData, id }: AddIcon) {
  return await axiosInstance.post(`/admin/themes/${id}/icon`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const getThemeById = (id: number | string) => {
  return axiosInstance.get(`/admin/themes/${id}`);
};

export const updateTheme = (id: number | string, data: AdminThemes) => {
  return axiosInstance.put(`/admin/themes/update/${id}`, data);
};

export type CategoryReq = {
  name: string;
  isActive: boolean;
};

export const updateCategory = (id: number | string, data: CategoryReq) => {
  return axiosInstance.put(`/admin/categories/${id}`, data);
};

export const getCallHistoryid = (id: number | string, page: number, size: number) => {
  return axiosInstance.get<PageResponse<CallHistory>>(`/admin/calls/history/${id}`, {
    params: { id, page, size, sortBy: "id", sortDirection: "ASC" },
  });
};

export type ConfirmData = {
  fullName?: string;
  bankName?: string;
  bankAccount?: string;
  sum?: number;
};

export const getDepositHistoryid = (id: number | string, page: number, size: number) => {
  return axiosInstance.get<PageResponse<RequestPage>>(`/admin/deposits/history/${id}`, {
    params: { id, page, size, sortBy: "id", sortDirection: "ASC" },
  });
};

export const getDepositHistory = (id: number | string) => {
  return axiosInstance.get(`/admin/deposits?userId=${id}`);
};

export const putDeposit = (id: number | string, sum: ConfirmData) => {
  return axiosInstance.put(`/admin/deposits/${id}`, sum);
};

export const getWithdrawHistory = (id: number | string) => {
  return axiosInstance.get(`/admin/withdrawals?userId=${id}`);
};

export const getWithdrawHistoryid = (id: number | string, page: number, size: number) => {
  return axiosInstance.get<PageResponse<RequestPage>>(`/admin/withdrawals/history/${id}`, {
    params: { id, page, size, sortBy: "id", sortDirection: "ASC" },
  });
};

export const putWithdraw = (id: number | string, data: ConfirmData) => {
  return axiosInstance.put(`/admin/withdrawals/${id}`, data);
};

export const postAdminFiles = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post("/admin/files/upload?type=AVATAR", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAdminFiles = (id: number | string) => {
  return axiosInstance.get(`/admin/files/${id}`);
};
