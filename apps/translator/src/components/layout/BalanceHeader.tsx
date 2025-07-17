import MainButton from "@shared/components/MainButton";
import { useNavigate, useLocation } from "react-router-dom";
import LogoHeader from "../logoHeader/LogoHeader";
import { StatusToggle } from "../animation/StatusToggle";
import { GrNext } from "react-icons/gr";

export default function BalanceHeader() {
  const navigate = useNavigate();

  const changePage = () => {
    if (isHomePage) navigate("/my-balance-translator-page");
    if (isBalancePage) navigate("/withdrawal-page");
  };

  const location = useLocation();

  const isHomePage = location.pathname === "/my-home-translator-page";
  const isBalancePage = location.pathname === "/my-balance-translator-page";

  return (
    <div
      className="home-header-wrapper home-header-balance"
      style={{
        backgroundImage: `url(/assets/balanceHeader/background.png)`,
      }}
    >
      <LogoHeader notifiIcon={true} backIcon={isBalancePage && true} />
      <div className="header-balance header-balance-block">
        <div>
          <p>Мой баланс</p>
          <div className="balance-count balance-count-block">
            <img src="/assets/icons/coin-icon.png" alt="coin-icon" />
            <div className="balance">300.000 вон </div>
          </div>
        </div>
        {isHomePage && <GrNext className="next-icon" onClick={changePage} />}
      </div>
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
