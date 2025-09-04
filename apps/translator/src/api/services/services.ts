import { compareDesc, parseISO } from "date-fns";
import type {
  CallFromApi,
  ChangePasswordData,
  NotificationResponse,
  RegisterFormValues,
  UserProfileExtra,
  WithdrawalForm,
} from "../../types/types";
import axiosInstance from "../axios-config";

export type AuthResponse = {
  token: string;
  id: number;
  role: string;
  phone: string;
};

// Login
export const LoginTranslator = async (data: RegisterFormValues) => {
  return axiosInstance.post("/auth/login", data);
};

// регистрация
export const registerTranslator = async (data: RegisterFormValues) => {
  const res = await axiosInstance.post<AuthResponse>("/auth/register", data);
  return res;
};

// отправка кода (по номеру телефона)
export const sendVerificationCode = async (phone: string) => {
  return axiosInstance.post("/publicResetPassword/reset/request", { phone });
};

// проверка кода (код + номер)
export const verifyCode = async (phone: string, code: string) => {
  return axiosInstance.post("/publicResetPassword/reset/verify", {
    phone,
    code,
  });
};

// получние Themes
export const getThemes = async () => {
  return await axiosInstance.get(`profile/themes`);
};

// отправка Themes
export const postThemes = async (ids: number) => {
  return await axiosInstance.post(`translator/themes/${ids}/select`);
};

// отправка Languages
export const getLanguages = async () => {
  const res = await axiosInstance.get("/profile/languages");
  return res;
};

// добавления доп иформации об переводчике
export const newTranslatorData = async (data: UserProfileExtra) => {
  return axiosInstance.put("/translator", data);
};

export const imgTranslatorData = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstance.post("/profile/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
// изменить пароль
export const changePassword = async (data: ChangePasswordData) => {
  return axiosInstance.post("/profile/password/update", data);
};

// Поменять статус переведчика
export const switchTranslatorStatus = async () => {
  try {
    const response = await axiosInstance.put("/translator/switch-status");
    return response;
  } catch (error) {
    console.error("Ошибка при переключении статуса:", error);
    throw error;
  }
};

export const getCallHistory = async (filter?: "isMissed" | "isLast") => {
  try {
    const params: any = {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "DESC",
      direction: "INCOMING",
    };

    if (filter === "isMissed") {
      params.isMissed = true;
    }
    if (filter === "isLast") {
      params.isLast = true;
    }

    const response = await axiosInstance.get("/profile/calls/history", {
      params,
    });
    const content: CallFromApi[] = response.content;
    const transformed = content.map((call) => ({
      id: `${call.date}-${call.phone}`,
      name: call.name,
      avatarUrl: "",
      theme: call.theme,
      time: call.duration,
      price: call.coins,
      date: call.date,
      rating: call.rating,
    }));
    const sorted = [...transformed].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
    return sorted;
  } catch (error: any) {
    console.error("Ошибка загрузки звонков:", error?.response?.data || error);
    return [];
  }
};

export const getBalance = async () => {
  try {
    const response = await axiosInstance.get("/profile/balance");
    return response.data; // Предположим, что backend возвращает просто число (баланс)
  } catch (error) {
    console.error("Ошибка при получении баланса:", error);
    throw error;
  }
};

export const getNotifications = async () => {
  const response = await axiosInstance.get<NotificationResponse>("/profile/notifications", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC", // или 'DESC'
    },
  });
  return response;
};

export const getUnreadNotificationsCount = async () => {
  try {
    const response = await axiosInstance.get("/profile/notifications/count", {
      params: { isUnread: true },
    });
    return response;
  } catch (error) {
    console.error("Ошибка при получении количества уведомлений:", error);
    throw error;
  }
};

export const postClearNotifications = async () => {
  return axiosInstance.post("/profile/notifications/clear");
};

export const postWithdrawalTranslator = async (data: WithdrawalForm) => {
  return axiosInstance.post("/translator/withdrawal", data);
};
