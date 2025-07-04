import { useNavigate } from "react-router-dom";

interface Props {
  page: string;
}
export default function HomeFooter({ page }: Props) {
  const navigate = useNavigate();
  const toHomePage = () => {
    navigate("/home");
  };
  return (
    <footer className="home-page-footer">
      <button type="button" onClick={toHomePage}>
        <img
          src={
            page === "main"
              ? "/assets/home/main-active.png"
              : "/assets/home/main.png"
          }
          alt="main"
        />
        <h3>Главная</h3>
      </button>
      <button>
        <img
          src={
            page === "phone"
              ? "/assets/home/phone-active.png"
              : "/assets/home/phone.png"
          }
          alt="phone"
        />
        <h3>Мои звонки</h3>
      </button>
      <button>
        <img
          src={
            page === "message"
              ? "/assets/home/message-active.png"
              : "/assets/home/message.png"
          }
          alt="message"
        />
        <h3>Сообщения</h3>
      </button>
      <button>
        <img
          src={
            page === "profile"
              ? "/assets/home/profile-active.png"
              : "/assets/home/profile.png"
          }
          alt="profile"
        />
        <h3>Профиль</h3>
      </button>
    </footer>
  );
}
