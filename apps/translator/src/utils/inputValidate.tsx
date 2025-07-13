import { FiEye } from "react-icons/fi";
import type { FormErrors } from "../types/types";

export const formatKoreanPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 7);
  const part3 = digits.slice(7);
  if (digits.length >= 8) {
    return [part1, part2, part3].filter(Boolean).join(" ");
  } else if (digits.length > 3) {
    return [part1, part2].filter(Boolean).join(" ");
  } else {
    return part1;
  }
};

export const validatePhone = (
  formatted: string,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  const raw = formatted.replace(/\s/g, "");
  const isValid = /^010\d{8}$/.test(raw);
  if (!isValid || raw.length !== 11) {
    setErrors((prev) => ({
      ...prev,
      phone: "Неверный формат номера",
    }));
  } else {
    setErrors((prev) => ({ ...prev, phone: "" }));
  }
};
export const validatePasswords = (
  password: string,
  repeatPassword: string,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  const newErrors = { password: "", confirmPassword: "" };
  if (password && password.length < 9) {
    newErrors.password = "Пароль должен быть не менее 9 символов";
  }
  if (repeatPassword && password !== repeatPassword) {
    newErrors.confirmPassword = "Пароли не совпадают";
  }
  setErrors((prev) => ({ ...prev, ...newErrors }));
};

export const showPasswordIcon = (
  show: boolean,
  errors?: string
): React.ReactNode => {
  return show ? (
    <FiEye
      style={show && errors ? { color: "B50000" } : { color: "#191D31" }}
    />
  ) : (
    <FiEye style={{ color: "#C1C1C1" }} />
  );
};

export function formatTopikLevel(input: string): string {
  const digitsOnly = input.replace(/\D/g, ""); // удаляет всё кроме цифр
  if (digitsOnly === "") return "";
  const number = parseInt(digitsOnly, 10);
  if (number >= 1 && number <= 6) {
    return String(number);
  }
  return "";
}
