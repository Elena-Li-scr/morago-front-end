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

export default function CodeInput() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const fieldNames = ["num1", "num2", "num3", "num4"] as const;

  const onSubmit = (data: Code) => {
    const code = fieldNames.map((key) => data[key]).join("");
    setSuccess(true);
    console.log("Verification code:", code);
  };

  const successHandler = () => {
    navigate("/home");
  };

  return (
    <div className="code-container">
      <BackButton icon="/assets/arrow-left.png" />
      <h2 className="code-header">Проверочный код</h2>
      <p className="sign-form-text">
        Мы отправили проверочный <br /> код на ваш номер телефона{" "}
      </p>
      <CodeForm onSubmit={onSubmit} />

      {success && (
        <SucessActionModal
          header="Регистрация
            прошла успешно"
          text="Теперь вы можете полноценно воспользоваться всеми возможностями"
          btn="Здорово!"
          bgImg="/assets/signIcons/success-note.png"
          className="button button-active"
          onClick={successHandler}
        />
      )}
    </div>
  );
}
