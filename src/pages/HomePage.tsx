import HomeHeader from "../components/HomeHeader";
import ThemePage from "../components/ThemePage";
import "../styles/homePage.css";
// import { useState } from "react";
export default function HomePage() {
  // const [useBefore, setUseBefore] = useState(false);
  return (
    <div className="home-page-wrapper">
      <HomeHeader />
      <ThemePage />
      <footer className="home-page-footer">
        <button>
          <img src="/assets/home/main.png" alt="main" />
          <h3>Главная</h3>
        </button>
        <button>
          <img src="/assets/home/phone.png" alt="phone" />
          <h3>Мои звонки</h3>
        </button>
        <button>
          <img src="/assets/home/message.png" alt="message" />
          <h3>Сообщения</h3>
        </button>
        <button>
          <img src="/assets/home/profile.png" alt="profile" />
          <h3>Профиль</h3>
        </button>
      </footer>
    </div>
  );
}
