import MainButton from "@shared/components/MainButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBalance } from "@shared/services/clientApi";

export default function BalanceHeader() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);

  const upBalance = () => {
    navigate("/balance-withdraw");
  };

  const toNotifications = () => {
    navigate("/notification");
  };

  useEffect(() => {
    let isMounted = true;
    const server = async () => {
      try {
        const res = await getBalance();
        if (isMounted) {
          setBalance(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    server();
    return () => {
      isMounted = false;
    };
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
