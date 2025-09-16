import { useState } from "react";
import SucessActionModal from "@shared/components/SucessActionModal";
import BackButton from "@shared/components/BackButton";
import CodeForm from "../components/CodeForm";
import { Verification } from "@shared/services/clientApi";
import axios from "axios";

import "@shared/styles/signUp.css";
import { useNavigate } from "react-router-dom";

interface Code {
  num1: string;
  num2: string;
  num3: string;
  num4: string;
}

export default function ForgotPasswordCode() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const fieldNames = ["num1", "num2", "num3", "num4"] as const;
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: Code) => {
    const code = fieldNames.map((key) => data[key]).join("");
    const payload = {
      code,
      phone: localStorage.getItem("phone")!,
    };
    try {
      if (payload) {
        const res = await Verification(payload);
        if (res.status === 200 || res.status === 201) {
          setSuccess(true);
          localStorage.setItem("resetToken", res.data);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "Internal server error: Invalid code") {
          setServerError("Вы ввели неверный код! Попробуйте снова");
        } else {
          setServerError("Произошла ошибка. Попробуйте снова.");
        }
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };

  const successHandler = () => {
    navigate("/new-password");
  };

  return (
    <div className="code-container">
      <BackButton icon="/assets/arrow-left.png" />
      <h2 className="code-header">Код для сброса пароля</h2>
      <p className="sign-form-text">Мы отправили код для сброса пароля на ваш номер телефона</p>
      <CodeForm onSubmit={onSubmit} serverError={serverError} />

      {success && (
        <SucessActionModal
          header="Пароль сброшен"
          text="Теперь вы можете войти с новым паролем"
          btn="Ok"
          bgImg="/assets/signIcons/success-note.png"
          className="button button-active"
          onClick={successHandler}
        />
      )}
    </div>
  );
}
