import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

interface Props {
  backIcon?: boolean;
  notifiIcon?: boolean;
}
export default function LogoHeader({ backIcon, notifiIcon }: Props) {
  const navigate = useNavigate();
  return (
    <div className="home-header">
      {backIcon ? (
        <button
          type="button"
          onClick={() => navigate("/my-home-translator-page")}
          className="back-button"
        >
          <IoArrowBackSharp className="back-icon" style={{ color: "#fff" }} />
        </button>
      ) : (
        <div style={{ width: `${notifiIcon ? "44px" : ""}` }}></div>
      )}
      <h2 className="home-header-logo">
        <img src="/assets/balanceHeader/morago.png" alt="morago" />
      </h2>
      {notifiIcon ? (
        <button type="button" className="home-notification-bell">
          <img
            src="/assets/balanceHeader/notification.svg"
            alt="notification"
          />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
