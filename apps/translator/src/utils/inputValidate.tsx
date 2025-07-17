import { FiEye } from "react-icons/fi";
import type { FormErrors } from "../types/types";

// Input Format ------------------------------

export const formatInputNumber = (value: string, name: string) => {
  let isValid = false;
  if (name === "phone") {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 7);
    const part3 = digits.slice(7);
    const formatted = [part1, part2, part3].filter(Boolean).join(" ");
    const isValid =
      digits.length >= 10 && digits.length <= 11 && digits.startsWith("010");
    return { formatted, isValid };
  }
  if (name === "bankAccount") {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    const formatted = digitsOnly.match(/.{1,4}/g)?.join("-") || "";
    isValid = digitsOnly.length >= 12;
    return { formatted, isValid };
  }
  if (name === "balance") {
    const digitsOnly = value.replace(/\D/g, "");
    const formatted = digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    isValid = parseInt(digitsOnly, 10) >= 50000;
    return { formatted, isValid };
  }
  return { formatted: value, isValid };
};

export function formatTopikLevel(input: string): string {
  const digitsOnly = input.replace(/\D/g, "");
  if (digitsOnly === "") return "";
  const number = parseInt(digitsOnly, 10);
  if (number >= 1 && number <= 6) {
    return String(number);
  }
  return "";
}

// Passsword Valitade ------------------------------

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

// Event Hadler Change ---------------------------

export const handleInput = <T extends Record<string, any>>(
  formData: T,
  target: HTMLInputElement | HTMLSelectElement,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  const { name, value } = target;
  const { formatted, isValid } = formatInputNumber(value, name);
  if (name === "phone") {
    setForm((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({
      ...prev,
      phone: !isValid ? "Неверный формат" : "",
    }));
    return;
  }

  if (
    name === "password" ||
    name === "confirmPassword" ||
    name === "currentPassword" ||
    name === "newPassword" ||
    name === "confirmNewPassword"
  ) {
    const updatedData = { ...formData, [name]: value };
    setForm(updatedData);
    validatePasswords(
      updatedData.password,
      updatedData.confirmPassword,
      setErrors
    );
    return;
  }

  if (name === "topikLevel") {
    setForm((prev) => ({
      ...prev,
      [name]: formatTopikLevel(value),
    }));
    return;
  }
  if (name === "bankAccount" || name === "balance") {
    setForm((prev) => ({
      ...prev,
      [name]: formatted,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: !isValid ? "Некорректный ввод" : "",
    }));
    return;
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
