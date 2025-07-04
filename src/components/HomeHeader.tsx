import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();
  const selectTranslator = () => {
    navigate("/call-selectors");
  };
  return (
    <div className="home-header-wrapper">
      <div className="home-header">
        <h2>
          <img src="/assets/home/morago.png" alt="morago" />
        </h2>
        <button type="button" className="home-notification-bell">
          <img src="/assets/home/notification-bell.png" alt="notification" />
        </button>
      </div>
      <div className="home-balance">
        <div>
          <p>Мой баланс</p>
          <div className="balance-count">
            <img src="/assets/home/coin-icon.png" alt="coin-icon" />
            <div className="balance">50.000</div>
            <div className="time-to-speak">~10 min</div>
          </div>
        </div>
        <div className="up-balance">
          <p>Пополнить</p>
          <button type="button" className="add-balance-button">
            <img src="/assets/home/add-square.png" alt="add balance button" />
          </button>
        </div>
      </div>
      <button
        type="button"
        className="home-call-button"
        onClick={selectTranslator}
      >
        Выбрать переводчика и позвонить
      </button>
    </div>
  );
}
