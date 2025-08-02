import axios from "axios";
const API_URL = "https://morago.up.railway.app";

interface NewUserPayload {
  password?: string;
  confirmPassword?: string;
  phone?: string;
  role?: string;
}

export function newUser(user: NewUserPayload) {
  return axios.post(`${API_URL}/auth/register`, user);
}
export function login(user: NewUserPayload) {
  return axios.post(`${API_URL}/auth/login`, user);
}
export function forgotPassword(user: NewUserPayload) {
  return axios.post(`${API_URL}/auth/login`, user);
}
export function newPassword(user: NewUserPayload) {
  return axios.post(`${API_URL}/auth/login`, user);
}
