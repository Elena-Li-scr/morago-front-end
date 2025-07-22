import MainButton from "@shared/components/MainButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "@shared/styles/greetingPage.css";

const bgData = {
  "bg-1": {
    class: "greeting-page-wrapper greeting-page-bg-1",
    title: "Не понимаете или не можете объяснить?",
    text: "Приложение Morago поможет, просто выберите вашего переводчика",
  },
  "bg-2": {
    class: "greeting-page-wrapper greeting-page-bg-2",
    title: "От больницы до риелтора",
    text: "Выбирайте среди разных тем — от пудонсана до больницы",
  },
  "bg-3": {
    class: "greeting-page-wrapper greeting-page-bg-3",
    title: "Первый звонок за наш счет",
    text: "Звони и плати только за реально использованные минуты",
  },
};

export default function GreetingPage() {
  const [bg, setBg] = useState<keyof typeof bgData>("bg-1");
  const navigate = useNavigate();

  const { class: bgClass, title, text } = bgData[bg];

  return (
    <div className={bgClass}>
      <button type="button" className="skip-button">
        Пропустить
      </button>
      <h2>{title}</h2>
      <p>{text}</p>

      <div className="bg-change-buttons">
        {Object.keys(bgData).map((key) => (
          <button
            key={key}
            className={bg === key ? "main-bg" : ""}
            onClick={() => setBg(key as keyof typeof bgData)}
          ></button>
        ))}
      </div>

      <MainButton
        type="button"
        text="Войти"
        onClick={() => navigate("/sign-in")}
        className="button button-active"
      />
      <MainButton
        type="button"
        text="Зарегистрироваться"
        onClick={() => navigate("/sign-up")}
        bgColor="#F8F9FB"
        className="button password-back-button"
      />
      <button
        type="button"
        className="translator-page-button"
        onClick={() => (window.location.href = "http://localhost:5173/register")}
      >
        Я переводчик
      </button>
    </div>
  );
}
