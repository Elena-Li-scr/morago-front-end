import HomeHeader from "../components/HomeHeader";
import ThemePage from "../components/ThemePage";
import Rating from "../components/Rating";
import FirstCallModal from "../components/FirstCallModal";
import "../styles/homePage.css";

interface LastCall {
  name: string;
  theme: string;
  rating: number;
  reviewsCount: number;
  photo: string;
  time: string;
}
export default function HomePage() {
  const showBanner = false;
  const lastCalls: LastCall[] = [
    {
      name: "К. Дмитрий",
      theme: "Банк",
      rating: 4,
      reviewsCount: 7,
      photo: "/assets/home/photo1.png",
      time: "04.25",
    },
    {
      name: "П. Наталья",
      theme: "Почта",
      rating: 3,
      reviewsCount: 34,
      photo: "/assets/home/photo2.png",
      time: "3.14",
    },
    {
      name: "Л. Мин Хо",
      theme: "Завод",
      rating: 4,
      reviewsCount: 67,
      photo: "/assets/home/photo3.png",
      time: "03.10",
    },
  ];
  return (
    <div className="home-page-wrapper">
      <HomeHeader />
      <ThemePage />
      <div className="home-last-calls">
        <h3>Мои последние звонки</h3>
        <div className="last-calls-list">
          {lastCalls.map((call: LastCall) => (
            <div className="last-calls-item">
              <img src={call.photo} alt="photo" />
              <div>
                <div className="call-main-info">
                  <p>{call.name}</p>
                  <Rating count={call.rating} />
                  <span>({call.reviewsCount})</span>
                </div>
                <p className="call-theme">{call.theme}</p>
              </div>
              <div className="last-call-time">{call.time}</div>
            </div>
          ))}
        </div>
      </div>
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
      {showBanner && <FirstCallModal />}
    </div>
  );
}
