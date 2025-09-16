import type {
  CallFromApi,
  CallPage,
  ChangePasswordData,
  RegisterFormValues,
  UserProfileExtra,
  WithdrawalForm,
} from "../types/types";
import axiosInstance from "./axiosInstance";

// Login
export const LoginTranslator = (data: RegisterFormValues) => {
  return axiosInstance.post("/auth/login", data);
};

// регистрация
export const registerTranslator = (data: RegisterFormValues) => {
  return axiosInstance.post<UserProfileExtra>("/auth/register", data);
};

// отправка кода (по номеру телефона)
export const sendVerificationCode = (phone: string) => {
  return axiosInstance.post("/publicResetPassword/reset/request", { phone });
};

// проверка кода (код + номер)
export const verifyCode = (phone: string, code: string) => {
  return axiosInstance.post("/publicResetPassword/reset/verify", {
    phone,
    code,
  });
};

// получние Themes
export const getThemes = () => {
  return axiosInstance.get(`profile/themes`);
};

// отправка Themes
export const postThemes = (ids: string) => {
  return axiosInstance.post(`translator/themes/${ids}/select`);
};

// отправка Languages
export const getLanguages = () => {
  return axiosInstance.get("/profile/languages");
};

// добавления доп иформации об переводчике
export const newTranslatorData = (data: UserProfileExtra) => {
  return axiosInstance.put("/translator", data);
};

export const imgTranslatorData = (file: File | string) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post("/profile/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// изменить пароль
export const changePassword = (data: ChangePasswordData) => {
  return axiosInstance.post("/profile/password/update", data);
};

// Поменять статус переведчика
export const switchTranslatorStatus = () => {
  try {
    return axiosInstance.put("/translator/switch-status");
  } catch (error) {
    console.error("Ошибка при переключении статуса:", error);
    throw error;
  }
};

export const getCallHistory = async (
  filter?: "isMissed" | "isLast",
): Promise<CallPage<CallFromApi>> => {
  try {
    const params = {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "DESC",
      direction: "INCOMING",
      isMissed: "",
      isLast: "",
    };

    if (filter === "isMissed") {
      params.isMissed = "true";
    }
    if (filter === "isLast") {
      params.isLast = "true";
    }
    const res = await axiosInstance.get<CallPage<CallFromApi>>("/profile/calls/history", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("Ошибка загрузки звонков:", error);
    return {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 5,
        offset: 0,
        paged: true,
        unpaged: false,
        sort: { sorted: true, unsorted: false, empty: false },
      },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
      number: 0,
      size: 5,
      numberOfElements: 0,
      empty: true,
      sort: { sorted: true, unsorted: false, empty: false },
    }; // возврат пустого Page
  }
};

export const getBalance = () => {
  try {
    return axiosInstance.get("/profile/balance"); // Предположим, что backend возвращает просто число (баланс)
  } catch (error) {
    console.error("Ошибка при получении баланса:", error);
    throw error;
  }
};

export const getNotifications = () => {
  return axiosInstance.get("/profile/notifications", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC", // или 'DESC'
    },
  });
};

export const getUnreadNotificationsCount = () => {
  try {
    return axiosInstance.get("/profile/notifications/count", {
      params: { isUnread: true },
    });
  } catch (error) {
    console.error("Ошибка при получении количества уведомлений:", error);
    throw error;
  }
};

export const postClearNotifications = () => {
  return axiosInstance.post("/profile/notifications/clear");
};

export const postWithdrawalTranslator = (data: WithdrawalForm) => {
  return axiosInstance.post("/translator/withdrawal", data);
};
