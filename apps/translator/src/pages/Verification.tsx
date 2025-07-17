import React, { useEffect, useRef, useState } from "react";
import "../assets/style/verification.css";
import { useNavigate } from "react-router-dom";
import SucessActionModal from "@shared/components/SucessActionModal";
import MainButton from "@shared/components/MainButton";
import { CODE_LENGTH, COUNTDOWN_SECONDS } from "../constans/constans";
import { MdKeyboardBackspace } from "react-icons/md";

export default function VerificationCode() {
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(COUNTDOWN_SECONDS);
  const [error, setError] = useState<string>("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updated = [...code];
      updated[index] = value;
      setCode(updated);
      setError("");
      if (value && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return ` ${min}:${sec}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode !== "1234") {
      setError("Неверный код. Попробуйте снова.");
    } else {
      setSuccess(true);
    }
  };

  const successSubmit = () => {
    const complitedCode = code.join("");
    console.log(complitedCode);
    navigate("/newTranslator");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="verification">
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="back-button"
        >
          <MdKeyboardBackspace className="back-icon" />
        </button>
        <h2 className="verification-title">Проверочный код</h2>
        <p className="verification-text">
          Мы отправили проверочный код на ваш номер телефона{" "}
        </p>
        <div className="verification-code">
          {code.map((digit, index) => (
            <input
              title={`${index + 1}`}
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              className={`verification-input`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <p className="verification-timer">{formatTime(timer)}</p>
        <p className="verification-onemore">
          Не получили код? <span>Ещё раз</span>
        </p>
        <MainButton
          type="submit"
          disabled={code.every((digit) => digit === "") || timer === 0}
          className={`button ${
            code.every((digit) => digit !== "") && "active"
          }`}
          text="Получить код"
        />
        {error && <p className="verification-error">{error}</p>}
      </form>
      {success && (
        <SucessActionModal
          onClick={successSubmit}
          bgImg="/assets/images/success.png"
          header="Регистрация прошла успешно"
          text="Теперь вы можете пользоваться всеми возможностями"
          btn="Здорово!"
          className="button active"
        />
      )}
    </div>
  );
}
