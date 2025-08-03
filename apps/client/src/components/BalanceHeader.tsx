import MainButton from "@shared/components/MainButton";
import { useNavigate } from "react-router-dom";

export default function BalanceHeader() {
  const navigate = useNavigate();

  const upBalance = () => {
    navigate("/balance-withdraw");
  };

  const toNotifications = () => {
    navigate("/notification");
  };
  return (
    <div className="home-header-wrapper">
      <div className="home-header">
        <h2>
          <img src="/assets/home/morago.png" alt="morago" />
        </h2>
        <button
          type="button"
          className="home-notification-bell"
          onClick={toNotifications}
        >
          <img src="/assets/home/notification-bell.png" alt="notification" />
        </button>
      </div>
      <div className="home-balance">
        <div>
          <p>Мой баланс</p>
          <div className="balance-count">
            <img src="/assets/home/coin-icon.png" alt="coin-icon" />
            <div className="balance">50.000</div>
          </div>
        </div>
      </div>
      <MainButton
        text="Пополнить баланс"
        type="button"
        onClick={upBalance}
        className="button button-active"
      />
    </div>
  );
}
