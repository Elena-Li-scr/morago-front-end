import axios from "axios";

export function getUser(id: number) {
  return axios.get(`/admin/users/${id}`);
}

export function getTranslator(id: number) {
  return axios.get(`/admin/translators/${id}`);
}

export function getTheme(id: number) {
  return axios.get(`/admin/themes/${id}`);
}

export function getCategory(id: number) {
  return axios.get(`/admin/categories/${id}`);
}
