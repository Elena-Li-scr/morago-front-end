import "@shared/styles/signUp.css";
import { useNavigate } from "react-router-dom";
import { newUser } from "@shared/services/clientApi";
import { useState } from "react";
import MainForm from "../components/MainForm";
import { Link } from "react-router-dom";
import axios from "axios";

interface SignUpFormData {
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: SignUpFormData) => {
    const user = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      phone: data.phone.replace(/\s+/g, ""),
      role: "ROLE_USER",
    };

    try {
      const response = await newUser(user);
      if (response?.data.token && response?.data.id) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("phone", response.data.phone);

        navigate("/code");
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
    <div className="input-container">
      <MainForm
        header="Регистрация пользователя"
        text="Зарегистрируйтесь, чтобы получить доступ ко всем преимуществам приложения"
        fields={["phone", "password", "confirmPassword"]}
        onSubmit={onSubmit}
        serverError={serverError}
        button="Получить код"
      />
      <p className="sign-form-note">
        <Link to="/sign-in" className="link-to-sign">
          Уже есть аккаунт
        </Link>
      </p>
      <p className="personal-data-warning">
        Нажимая на кнопку, вы даете согласие на обработку своих персональных данных
      </p>
    </div>
  );
}
