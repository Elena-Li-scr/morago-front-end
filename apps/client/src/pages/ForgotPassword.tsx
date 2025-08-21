import "@shared/styles/signUp.css";
import { useNavigate } from "react-router-dom";
import MainForm from "../components/MainForm";
import { useState } from "react";
import { sendVerificationCode } from "@shared/services/clientApi";
import axios from "axios";

interface FormData {
  phone: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: FormData) => {
    const payload = {
      phone: data.phone.replace(/\s+/g, ""),
    };

    try {
      const response = await sendVerificationCode(payload);
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        navigate("/forgot-password-code");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "User profile not found") {
          setServerError("Такой пользователь не найден");
        } else {
          setServerError("Произошла ошибка. Попробуйте снова.");
        }
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <MainForm
      header="Восстановить пароль"
      serverError={serverError}
      fields={["phone"]}
      button="Сбросить пароль"
      button2="Назад"
      onSubmit={onSubmit}
      onClick={goBack}
    />
  );
}
