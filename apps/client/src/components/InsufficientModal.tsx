import "@shared/styles/modals.css";
import { useNavigate } from "react-router-dom";
import { useLowBalance } from "@shared/store/useStore";
export default function InsufficientModal() {
  const navigate = useNavigate();
  const { setLowBalance } = useLowBalance();

  return (
    <div className="modal-window-wrapper">
      <div className="balance-modal-wrapper">
        <div className="balance-modal-info">
          <h5>Недостаточно средств</h5>
          <p>Пополните баланс</p>
        </div>
        <div className="balance-modal-buttons">
          <button
            type="button"
            onClick={() => {
              navigate("/home");
              setLowBalance(false);
            }}
          >
            Позже
          </button>
          <button type="button" onClick={() => navigate("/up-balance")}>
            Пополнить
          </button>
        </div>
      </div>
    </div>
  );
}
