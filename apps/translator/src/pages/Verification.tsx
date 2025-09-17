import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CODE_LENGTH } from "../constans/constans";
import MainButton from "@shared/components/MainButton";
import "../assets/style/verification.css";
import SucessActionModal from "@shared/components/SucessActionModal";
import { auth } from "../utils/auth";
import ChangePageBtn from "../components/buttons/ChangePageBtn";
import { sendVerificationCode } from "@shared/services/translatorApi";
import type { AxiosError } from "axios";

type VerificationParams = {
  process: "register" | "reset";
  phone: string;
};
type ModalText = {
  title: string;
  text: string;
};
const TITLES: Record<"register" | "reset", string> = {
  register: "Подтверждение регистрации",
  reset: "Код для сброса пароля",
};
const MODAL_TEXT: Record<"register" | "reset", ModalText> = {
  register: {
    title: "Регистрация прошла успешно",
    text: "Теперь вы можете полноценно воспользоваться всеми возможностями",
  },
  reset: {
    title: "Пароль сброшен",
    text: "Теперь вы можете войти с новым паролем",
  },
};

export default function VerificationPage() {
  const [success, setSuccess] = useState(false);
  const { process = "register", phone = "" } = useParams<VerificationParams>();
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(180); // 3 минуты
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Только одна цифра
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    // Перемещаем фокус
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) return;
    try {
      // const success = await verifyCode(phone!, fullCode);
      if (process === "register") {
        auth.setVerified();
      }
      setSuccess(true);
    } catch (err) {
      const axiosErr = err as AxiosError<{ error: string }>;
      setError(axiosErr.response?.data?.error || "");
    }
  };

  const successSubmit = () => {
    navigate(process === "register" ? `/new-translator/${phone}` : "/new-password");
    setSuccess(false);
  };

  const handleResend = async () => {
    const repeatCode = await sendVerificationCode(phone);
    console.log(repeatCode.data);
    setRemaining(180); // Сбросить таймер
  };

  const formattedTimer = `${Math.floor(remaining / 60)}:${("0" + (remaining % 60)).slice(-2)}`;

  return (
    <div className="container">
      <div className="verification">
        <ChangePageBtn page="changePasswordIkconBack" />
        <h2 className="verification-title">{TITLES[process]}</h2>
        <p className="verification-text">Мы отправили проверочный код на ваш номер телефона</p>
        <div className="verification-code">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              className="verification-input"
            />
          ))}
        </div>
        <p className="verification-timer">{formattedTimer}</p>
        {error && <p className="register-validate">{error}</p>}
        <MainButton
          type="submit"
          disabled={code.some((digit) => digit === "") || remaining === 0}
          className={`button ${
            code.every((digit) => digit !== "" && remaining > 0) ? "active" : ""
          }`}
          text=" Подтвердить"
          onClick={handleSubmit}
        />
        {remaining === 0 && (
          <div className="verification-rest-text">
            <span> Не получили код? </span>
            <button onClick={handleResend} className="verification-reset-code">
              Ещё раз
            </button>
          </div>
        )}
        {success && (
          <SucessActionModal
            onClick={successSubmit}
            bgImg="/assets/images/success.png"
            header={`${MODAL_TEXT[process].title}`}
            text={`${MODAL_TEXT[process].text}`}
            btn="Здорово!"
            className="button active"
          />
        )}
      </div>
    </div>
  );
}
