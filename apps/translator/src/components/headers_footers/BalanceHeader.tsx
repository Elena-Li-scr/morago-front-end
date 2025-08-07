import MainButton from "@shared/components/MainButton";
import { useNavigate, useLocation } from "react-router-dom";
import LogoHeader from "./LogoHeader";
import { StatusToggle } from "../animation/StatusToggle";
import { GrNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import { getBalance } from "../../api/services/services";

export default function BalanceHeader() {
  const [balance, setBalance] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await getBalance();
        setBalance(result);
      } catch (err) {
        console.error("Не удалось загрузить баланс");
      }
    };
    fetchBalance();
  }, []);
  const changePage = () => {
    if (isHomePage) navigate("/my-balance-translator-page");
    if (isBalancePage) navigate("/withdrawal-page");
  };

  const location = useLocation();

  const isHomePage = location.pathname === "/my-home-translator-page";
  const isBalancePage = location.pathname === "/my-balance-translator-page";
  const isCallHistory = location.pathname === "/my-call-history";

  return (
    <div
      className="home-header-wrapper home-header-balance"
      style={{
        backgroundImage: `url(/assets/balanceHeader/background.png)`,
      }}
    >
      <LogoHeader notifiIcon={!isCallHistory && true} backIcon={isBalancePage && true} />
      {!isCallHistory && (
        <div className="header-balance header-balance-block">
          <div>
            <p>Мой баланс</p>
            <div className="balance-count balance-count-block">
              <img src="/assets/icons/coin-icon.png" alt="coin-icon" />
              <div className="balance">{balance} вон </div>
            </div>
          </div>
          {isHomePage && <GrNext className="next-icon" onClick={changePage} />}
        </div>
      )}
      {isHomePage && <StatusToggle />}
      {isBalancePage && (
        <MainButton
          bgColor="inherit"
          text="Вывод средств"
          className="button balance-btn"
          type="button"
          onClick={changePage}
        />
      )}
    </div>
  );
}
