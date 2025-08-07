import axiosInstance from "./axiosInstance";
import type { NewUserPayload, ProfilePayload, BalancePayload } from "../types/types";

export function newUser(payload: NewUserPayload) {
  return axiosInstance.post("/auth/register", payload);
}

export function login(payload: NewUserPayload) {
  return axiosInstance.post("/auth/login", payload);
}

export function newPassword(payload: NewUserPayload) {
  return axiosInstance.post("/profile/password/update", payload);
}

export function updatePassword(payload: NewUserPayload) {
  return axiosInstance.post("/profile/password/update", payload); //нерабочая
}

export function clearAllNote() {
  return axiosInstance.post("/profile/notifications/clear", {});
}

export function updateAvatar(formData: FormData) {
  return axiosInstance.post("/profile/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateName(payload: ProfilePayload) {
  return axiosInstance.put("/user", payload);
}

export function getPopularThemes() {
  return axiosInstance.get("/profile/themes/popular", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
    },
  });
}

export function getCategories() {
  return axiosInstance.get("/profile/categories", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
      isActive: true,
    },
  });
} // приходит пустым

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

export function getBalance() {
  return axiosInstance.get("/profile/balance");
}

export function sendDeposit(payload: BalancePayload) {
  return axiosInstance.post("/user/deposit", payload);
}

export function sendVerificationCode(payload: NewUserPayload) {
  return axiosInstance.post("/publicResetPassword/reset/request", payload);
} //не можем получить код

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
