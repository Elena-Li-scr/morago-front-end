import "@shared/styles/modals.css";
import { useNavigate } from "react-router-dom";
import { useFirstCall } from "@shared/store/useStore";
import { IoClose } from "react-icons/io5";

export default function FirstCallModal() {
  const navigate = useNavigate();
  const { setIsFirstCall } = useFirstCall();
  return (
    <div className="modal-window-wrapper">
      <div className="modal-window">
        <button className="modal-window-close-button" onClick={() => setIsFirstCall(false)}>
          <IoClose />
        </button>
        <h2>ПЕРВЫЙ ЗВОНОК БЕСПЛАТНЫЙ!</h2>
        <p>
          Попробуйте сервис Мораго <br /> транслейт за наш счёт
        </p>
        <img className="banner-img" src="/assets/home/free-call-banner.png" alt="banner" />
        <button
          type="button"
          className="modal-window-button"
          onClick={() => {
            navigate("/call-selectors");
          }}
        >
          Попробовать
        </button>
      </div>
    </div>
  );
}
