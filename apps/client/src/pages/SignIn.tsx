import "@shared/styles/signUp.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainForm from "../components/MainForm";
import { login } from "@shared/services/clientApi";
import axios from "axios";

interface FormData {
  phone: string;
  password: string;
}

export default function SignIn() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const user = {
      password: data.password,
      phone: data.phone.replace(/\s+/g, ""),
    };
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    localStorage.removeItem("id");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("avatar");
    try {
      const response = await login(user);
      if (response?.data.token && response?.data.id) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("phone", response.data.phone);
        localStorage.setItem("id", String(response.data.id));

        if (response.data.firstName && response.data.lastName) {
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
        }

        if (response.data.imageUrl) {
          localStorage.setItem("avatar", response.data.imageUrl);
        }

        navigate("/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "Invalid phone or password") {
          setServerError("Неверный номер телефона или пароль");
        } else {
          setServerError("Произошла ошибка. Попробуйте снова.");
        }
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };

  return (
    <div className="input-container">
      <MainForm
        header="Войдите"
        text="Войдите, чтобы воспользоваться всеми преимуществами приложения"
        onSubmit={onSubmit}
        fields={["phone", "password"]}
        serverError={serverError}
        button="Войти"
        button2="Зарегистрироваться"
        onClick={() => navigate("/sign-up")}
      />
      <button
        className="to-forgot-password-page"
        type="button"
        onClick={() => navigate("/forgot-password")}
      >
        Забыли пароль
      </button>
    </div>
  );
}
