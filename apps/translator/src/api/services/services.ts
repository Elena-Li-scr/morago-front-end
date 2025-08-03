import type {
  ChangePasswordData,
  RegisterFormValues,
  UserProfileExtra,
} from "../../types/types";
import axiosInstance from "../axios-config";

// Login
export const LoginTranslator = async (data: RegisterFormValues) => {
  return axiosInstance.post("/auth/login", data);
};

// регистрация
export const registerTranslator = async (data: RegisterFormValues) => {
  return axiosInstance.post("/auth/register", data).then((res) => res.data);
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

export const newTranslatorData = async (data: UserProfileExtra) => {
  return axiosInstance.put("/translator", data).then((res) => res.data);
};

export const changePassword = async (data: ChangePasswordData) => {
  return axiosInstance.post("/profile/password/update", data);
};
