import MainButton from "@shared/components/MainButton";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import "@shared/styles/greetingPage.css";

const bgData = [
  {
    title: "Не понимаете или не можете объяснить?",
    text: "Приложение Morago поможет, просто выберите вашего переводчика",
    image: "/assets/background-1.png",
  },
  {
    title: "От больницы до риелтора",
    text: "Выбирайте среди разных тем — от пудонсана до больницы",
    image: "/assets/background-2.png",
  },
  {
    title: "Первый звонок за наш счет",
    text: "Звони и плати только за реально использованные минуты",
    image: "/assets/background-3.png",
  },
];
export default function GreetingPage() {
  const navigate = useNavigate();

  return (
    <div className="greeting-page-wrapper">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {bgData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-container">
              <div
                className="background-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="slide-text">
                <h1 className="greeting-page-title">{slide.title}</h1>
                <p className="greeting-page-text">{slide.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button type="button" className="skip-button">
        Пропустить
      </button>

      <div className="greeting-buttons">
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
    </div>
  );
}
