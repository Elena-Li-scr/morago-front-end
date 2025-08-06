import axios from "axios";
const API_URL = "https://morago.up.railway.app";
const token = localStorage.getItem("token");

interface NewUserPayload {
  password?: string;
  confirmPassword?: string;
  phone?: string;
  role?: string;
}

interface ProfilePayload {
  lastName?: string;
  firstName?: string;
  imageUrl?: FileList;
}

export function newUser(payload: NewUserPayload) {
  return axios.post(`${API_URL}/auth/register`, payload);
}
export function login(payload: NewUserPayload) {
  return axios.post(`${API_URL}/auth/login`, payload);
}
export function forgotPassword(payload: NewUserPayload) {
  return axios.post(`${API_URL}/publicResetPassword/reset/request`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function newPassword(payload: NewUserPayload) {
  return axios.post(`${API_URL}/profile/password/update`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function updatePassword(payload: NewUserPayload) {
  return axios.post(`${API_URL}/profile/password/update`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function clearAllNote() {
  return axios.post(
    `${API_URL}/profile/notifications/clear`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
}

export function updateAvatar(formData: FormData) {
  return axios.post(`${API_URL}/profile/avatar/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateName(payload: ProfilePayload) {
  return axios.put(`${API_URL}/user`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getPopularThemes() {
  return axios.get(`${API_URL}/profile/themes/popular`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

export function getCategories() {
  return axios.get(`${API_URL}/profile/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
      isActive: true,
    },
  });
}

export function getLastCalls() {
  return axios.get(`${API_URL}/profile/calls/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      isLast: true,
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

export function getMissedCalls() {
  return axios.get(`${API_URL}/profile/calls/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      isMissed: true,
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

export function getBalance() {
  return axios.get(`${API_URL}/profile/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
