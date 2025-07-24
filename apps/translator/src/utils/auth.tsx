const TOKEN_KEY = "accessToken";
const VERIFIED_KEY = "isVerified";
const PROFILE_KEY = "isProfileFilled";

export const auth = {
  // Проверки
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
  isVerified: () => localStorage.getItem(VERIFIED_KEY) === "true",
  isProfileFilled: () => localStorage.getItem(PROFILE_KEY) === "true",

  // Установка
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
