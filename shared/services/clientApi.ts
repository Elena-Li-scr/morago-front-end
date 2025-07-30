import axios from "axios";
const API_URL = "https://morago.up.railway.app";

interface NewUserPayload {
  user: {
    password: string;
    confirmPassword: string;
    phone: string;
    role: string;
  };
}

export function newUser(payload: NewUserPayload) {
  return axios.post(`${API_URL}/auth/register`, payload);
}
