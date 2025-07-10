import { useNavigate } from "react-router-dom";
import { useTopicStore } from "../store/useTopicStore";

interface Props {
  page: string;
}
export default function MainFooter({ page }: Props) {
  const { setChosenTopic } = useTopicStore();
  const navigate = useNavigate();
  const toHomePage = () => {
    navigate("/home");
    setChosenTopic("");
  };
  const toProfilePage = () => {
    navigate("/profile");
    setChosenTopic("");
  };
  return (
    <footer className="main-footer">
      <button type="button" onClick={toHomePage}>
        <img
          src={
            page === "main"
              ? "/assets/home/main-active.png"
              : "/assets/home/main.png"
          }
          alt="main"
        />
        <h3 className={page === "main" ? "main-footer-active" : ""}>Главная</h3>
      </button>
      <button type="button">
        <img
          src={
            page === "phone"
              ? "/assets/home/phone-active.png"
              : "/assets/home/phone.png"
          }
          alt="phone"
        />
        <h3 className={page === "phone" ? "main-footer-active" : ""}>
          Мои звонки
        </h3>
      </button>
      <button type="button">
        <img
          src={
            page === "message"
              ? "/assets/home/message-active.png"
              : "/assets/home/message.png"
          }
          alt="message"
        />
        <h3 className={page === "message" ? "main-footer-active" : ""}>
          Сообщения
        </h3>
      </button>
      <button type="button" onClick={toProfilePage}>
        <img
          src={
            page === "profile"
              ? "/assets/home/profile-active.png"
              : "/assets/home/profile.png"
          }
          alt="profile"
        />
        <h3 className={page === "profile" ? "main-footer-active" : ""}>
          Профиль
        </h3>
      </button>
    </footer>
  );
}
