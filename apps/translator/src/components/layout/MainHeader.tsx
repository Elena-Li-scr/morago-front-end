import { useNavigate, useLocation } from "react-router-dom";
import BalanceHeader from "./BalanceHeader";

export default function MainHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname.toLowerCase() === "/my-profile-page";

  if (isProfilePage) {
    return (
      <div
        className="home-header-wrapper home-header-balance"
        style={{
          backgroundImage: `url(/assets/balanceHeader/background.png)`,
        }}
      >
        <div className="container" style={{ padding: "0px" }}>
          <h5 className="profile-title">Мой профиль</h5>
          <div className="profile-data">
            <img src="/assets/images/user.png" alt="" className="profile-img" />
            <div className="profile-info">
              <p className="profile-name">К. Диана</p>
              <p className="profile-phone">010 1234 56 78</p>
            </div>
            <button className="profile-button">Изменить</button>
          </div>
        </div>
      </div>
    );
  }
  if (location.pathname.startsWith("/my-profile-page/")) {
    return null;
  } else {
    return <BalanceHeader />;
  }
}
