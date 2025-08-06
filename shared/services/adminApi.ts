import axios from "axios";
const API_URL = "https://morago.up.railway.app";
const token = localStorage.getItem("token");

export function getUser(id: string) {
  return axios.get(`${API_URL}/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getTranslator(id: string) {
  return axios.get(`${API_URL}/admin/translators/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getTheme(id: string) {
  return axios.get(`${API_URL}/admin/themes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getCategory(id: string) {
  return axios.get(`${API_URL}/admin/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
