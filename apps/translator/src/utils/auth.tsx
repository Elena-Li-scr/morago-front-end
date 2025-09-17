import type { UserProfileExtra } from "@shared/types/types";

const TOKEN_KEY = "token";
const VERIFIED_KEY = "isVerified";
const PROFILE_KEY = "isProfileFilled";
const NEW_TRANSLATOR_DATA = "newTranslator";

export const auth = {
  // Проверки
  isAuthenticated: () => localStorage.getItem(TOKEN_KEY),
  isVerified: () => localStorage.getItem(VERIFIED_KEY) === "true",
  isProfileFilled: () => localStorage.getItem(PROFILE_KEY) === "true",
  isNewTranslator: () => localStorage.getItem(NEW_TRANSLATOR_DATA),

  // Установка
  setNewTranslator: (data: UserProfileExtra) =>
    localStorage.setItem(NEW_TRANSLATOR_DATA, JSON.stringify(data)),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  setVerified: () => localStorage.setItem(VERIFIED_KEY, "true"),
  setProfileFilled: () => localStorage.setItem(PROFILE_KEY, "true"),

  // Очистка
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(VERIFIED_KEY);
    localStorage.removeItem(PROFILE_KEY);
  },
};
