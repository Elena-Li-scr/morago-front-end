import "@shared/styles/profile.css";
import BackButton from "@shared/components/BackButton";
import SucessActionModal from "@shared/components/SucessActionModal";
import MainForm from "../components/MainForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "@shared/services/clientApi";
import axios from "axios";

interface FormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: FormData) => {
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const res = await updatePassword(payload);
      console.log(payload);
      if (res.status === 200 || res.status === 204) {
        setSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "Internal server error: Passwords don't match") {
          setServerError("Неверно указан текущий пароль");
        } else {
          setServerError("Произошла ошибка. Попробуйте снова.");
        }
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };

  const successHandler = () => navigate("/profile");

  return (
    <div className="page-wrapper change-profile-wrapper">
      <div className="change-profile-header">
        <BackButton icon="/assets/arrow-left.png" />
        <h3>Изменить пароль</h3>
      </div>

      <MainForm
        onSubmit={onSubmit}
        serverError={serverError}
        header=""
        text=""
        fields={["oldPassword", "password", "confirmPassword"]}
        button="Сохранить изменения"
      />

      {success && (
        <SucessActionModal
          header="Пароль изменен успешно"
          btn="Здорово!"
          bgImg="/assets/signIcons/success-note.png"
          className="button button-active"
          onClick={successHandler}
        />
      )}
    </div>
  );
}
