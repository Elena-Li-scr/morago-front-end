import { useNavigate, useLocation } from "react-router-dom";
import AvatarUpload from "../registration_translator/AvatarUpload";
import { useTranslatorFromLocalStorage } from "../hooks/useTranslatorFromLocalStorage";

export default function ProfileHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate("change-data", { relative: "path" });
  };

  const translator = useTranslatorFromLocalStorage();

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
          <AvatarUpload translatorAvatar={translator?.profilePhoto} />
          <div className="profile-info">
            <p className="profile-name">{translator?.fullName}</p>
            <p className="profile-phone">{translator?.phone}</p>
          </div>
          <button onClick={handleClick} className="profile-button">
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
}
