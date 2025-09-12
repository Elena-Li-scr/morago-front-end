import axiosInstance from "./axiosInstance";

import type { NewUserPayload, ProfilePayload, BalancePayload, CallProps } from "../types/types";

// registration

export function newUser(payload: NewUserPayload) {
  return axiosInstance.post("/auth/register", payload);
}

//login
export function login(payload: NewUserPayload) {
  return axiosInstance.post("/auth/login", payload);
}

//changing password

export function newPassword(payload: NewUserPayload) {
  return axiosInstance.post("/profile/password/update", payload);
}

export function updatePassword(payload: NewUserPayload) {
  return axiosInstance.post("/profile/password/update", payload); //don't work
}

// notification cleaner
export function clearAllNote() {
  return axiosInstance.post("/profile/notifications/clear", {});
}

//adding or changing avatar
export function updateAvatar(formData: FormData) {
  return axiosInstance.post("http://localhost:8080/profile/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//changing profile name

export function updateName(payload: ProfilePayload) {
  return axiosInstance.put("/user", payload);
}

//geting popular themes

export function getPopularThemes() {
  return axiosInstance.get("/profile/themes/popular", {
    params: {
      page: 0,
      size: 10,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

//getting all categories

export function getCategories() {
  return axiosInstance.get("/profile/categories", {
    params: {
      page: 0,
      size: 9,
      sortBy: "id",
      sortDirection: "ASC",
      isActive: true,
    },
  });
}

//getting all last calls

export function getLastCalls() {
  return axiosInstance.get("/profile/calls/history", {
    params: {
      isLast: true,
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

//getting all missed calls

export function getMissedCalls() {
  return axiosInstance.get("/profile/calls/history", {
    params: {
      isMissed: true,
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

//getting All Calls

export function getAllCalls() {
  return axiosInstance.get("/profile/calls/history", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

//getting balance

export function getBalance() {
  return axiosInstance.get("/profile/balance");
}

//sending deposit request
export function sendDeposit(payload: BalancePayload) {
  return axiosInstance.post("/user/deposit", payload);
}

export function sendVerificationCode(payload: NewUserPayload) {
  return axiosInstance.post("/publicResetPassword/reset/request", payload);
}

export function Verification(payload: NewUserPayload) {
  return axiosInstance.post("/publicResetPassword/reset/verify", payload);
}

export function sendNewPassword(payload: NewUserPayload) {
  return axiosInstance.post("/publicResetPassword/reset/confirm", payload);
}

// export function getTranslatorsList(themeId: number) {
//   return axiosInstance.get("/user/translators", {
//     params: { themeId, page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
//   });
// }

//получение уведомлений

export function getNotifications() {
  return axiosInstance.get("/profile/notifications", {
    params: { page: 0, size: 5, sortBy: "id", sortDirection: "ASC" },
  });
}

// получение колличества
export function getNotificationsCount() {
  return axiosInstance.get("/profile/notifications/count", {
    params: { isUnread: true },
  });
}

//get themes by category id

export function getThemesByCategory({ id }: { id: number }) {
  return axiosInstance.get(`/profile/categories/${id}/themes`, {
    params: {
      page: 0,
      size: 10,
      sortBy: "id",
      sortDirection: "ASC",
      isActive: true,
      keyword: "string",
    },
  });
}

export function getTranslatorsByTheme({ id }: { id: number | string }) {
  return axiosInstance.get(`/user/translators`, {
    params: {
      themeId: id,
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

export function addLastChoosenThemes({ id }: { id: number | string }) {
  return axiosInstance.post(`/profile/themes/${id}/favorite`, {});
}

export function createCall(payload: CallProps) {
  return axiosInstance.post(`/call/create`, payload);
}
