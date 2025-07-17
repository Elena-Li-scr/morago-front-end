import { useState } from "react";
import SucessActionModal from "@shared/components/SucessActionModal";
import BackButton from "@shared/components/BackButton";
import CodeForm from "../components/CodeForm";

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

  const onSubmit = (data: Code) => {
    const code = fieldNames.map((key) => data[key]).join("");
    setSuccess(true);
    console.log("Verification code:", code);
  };

  const successHandler = () => {
    navigate("/new-password");
  };

  return (
    <div className="code-container">
      <BackButton icon="/assets/arrow-left.png" />
      <h2 className="code-header">Код для сброса пароля</h2>
      <p className="sign-form-text">
        Мы отправили код для сброса пароля на ваш номер телефона
      </p>
      <CodeForm onSubmit={onSubmit} />

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
