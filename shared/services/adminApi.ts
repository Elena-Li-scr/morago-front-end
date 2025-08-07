import axiosInstance from "./axiosInstance";

export function getUser(id: string) {
  return axiosInstance.get(`/admin/users/${id}`);
}

export function getTranslator(id: string) {
  return axiosInstance.get(`/admin/translators/${id}`);
}

export function getTheme(id: string) {
  return axiosInstance.get(`/admin/themes/${id}`);
}

export function getCategory(id: string) {
  return axiosInstance.get(`/admin/categories/${id}`);
}
