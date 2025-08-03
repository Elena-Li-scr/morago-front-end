import { useNavigate } from "react-router-dom";
import AvatarUpload from "../registration_translator/AvatarUpload";
import { useTranslatorFromLocalStorage } from "../hooks/useTranslatorFromLocalStorage";

export default function ProfileHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("change-data", { relative: "path" });
  };

  const translator = useTranslatorFromLocalStorage();
  const fullName = ` ${translator?.firstName} ${translator?.lastName}`;

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
          <AvatarUpload translatorAvatar={translator?.imageUrl} />
          <div className="profile-info">
            <p className="profile-name">{fullName}</p>
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
