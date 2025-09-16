import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBalance } from "@shared/services/clientApi";

export default function HomeHeader() {
  const [balance, setBalance] = useState<number>(0);
  const navigate = useNavigate();
  const selectTranslator = () => {
    navigate("/call-selectors");
  };

  const upBalance = () => {
    navigate("/up-balance");
  };

  const toNotifications = () => {
    navigate("/notification");
  };

  useEffect(() => {
    const server = async () => {
      try {
        const res = await getBalance();
        setBalance(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    server();
  }, []);
  return (
    <div className="home-header-wrapper">
      <div className="home-header">
        <h2>
          <img src="/assets/home/morago.png" alt="morago" />
        </h2>
        <button type="button" className="home-notification-bell" onClick={toNotifications}>
          <img src="/assets/home/notification-bell.png" alt="notification" />
        </button>
      </div>
      <div className="home-balance">
        <div>
          <p>Мой баланс</p>
          <div className="balance-count">
            <img src="/assets/home/coin-icon.png" alt="coin-icon" />
            <div className={balance > 0 ? "balance" : "balance minus-balance"}>{balance}</div>
            <div className="time-to-speak">~10 min</div>
          </div>
        </div>
        <div className="up-balance">
          <p>Пополнить</p>
          <button type="button" className="add-balance-button" onClick={upBalance}>
            <img src="/assets/home/add-square.png" alt="add balance button" />
          </button>
        </div>
      </div>
      <button type="button" className="home-call-button" onClick={selectTranslator}>
        Выбрать переводчика и позвонить
      </button>
    </div>
  );
}
