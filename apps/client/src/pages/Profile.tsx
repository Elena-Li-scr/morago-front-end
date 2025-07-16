import "@shared/styles/profile.css";
import MainFooter from "../components/MainFooter";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const changeProfile = () => {
    navigate("/change-profile");
  };

  const ChangePassword = () => {
    navigate("/change-password");
  };

  const toNotifications = () => {
    navigate("/notification");
  };
  return (
    <div className="profile-wrapper">
      <header className="profile-header">
        <h2>Мой профиль</h2>
        <div className="profile-header-info">
          <div>
            <img
              src="/assets/profile/temporary-photo.png"
              alt="profile-photo"
              className="profile-image"
            />
            <div>
              <p className="profile-name">Имя Фамилия</p>
              <p className="profile-phone">010 1234 56 78</p>
            </div>
          </div>
          <button
            type="button"
            className="profile-change-button"
            onClick={changeProfile}
          >
            Изменить
          </button>
        </div>
      </header>
      <div className="profile-main">
        <h3>Настройки</h3>
        <button
          type="button"
          className="profile-main-option"
          onClick={ChangePassword}
        >
          <img src="/assets/signIcons/lock-valid.png" alt="change password" />
          <p>Изменить пароль</p>
        </button>
        <button
          type="button"
          className="profile-main-option"
          onClick={toNotifications}
        >
          <img src="/assets/profile/notification.png" alt="notification" />
          <p>Уведомления</p>
        </button>
        <h3>О приложении</h3>
        <button type="button" className="profile-main-option">
          <img src="/assets/profile/help.png" alt="help" />
          <p>FAQ</p>
        </button>
        <button type="button" className="profile-main-option">
          <img src="/assets/profile/security.png" alt="privacy policy" />
          <p>Privacy Policy</p>
        </button>
        <button type="button" className="profile-main-option">
          <img src="/assets/profile/contact.png" alt="contact" />
          <p>Связаться с нами</p>
        </button>

        <h3>Другое</h3>
        <button type="button" className="profile-main-option">
          <img src="/assets/profile/share.png" alt="share" />
          <p>Поделиться</p>
        </button>
      </div>
      <MainFooter page="profile" />
    </div>
  );
}
