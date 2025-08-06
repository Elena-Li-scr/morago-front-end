import "@shared/styles/signUp.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainForm from "../components/MainForm";
import { newPassword } from "@shared/services/clientApi";
import axios from "axios";

interface FormData {
  password: string;
  confirmPassword: string;
}
export default function NewPassword() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const user = {
      password: data.password,
    };
    try {
      const response = await newPassword(user);
      if (response?.data.token && response?.data.id) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate("/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "User profile already exists") {
          setServerError("Такой пользователь уже существует");
        } else {
          setServerError("Произошла ошибка. Попробуйте снова.");
        }
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };

  return (
    <MainForm
      header="Новый пароль"
      text="Введите новый пароль для входа в личный кабинет"
      fields={["password", "confirmPassword"]}
      button="Войти"
      onSubmit={onSubmit}
      serverError={serverError}
    />
  );
}
