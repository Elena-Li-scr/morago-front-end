import "../styles/Modals.css";
export default function InsufficientModal() {
  return (
    <div className="modal-window-wrapper">
      <div className="balance-modal-wrapper">
        <div className="balance-modal-info">
          <h5>Недостаточно средств</h5>
          <p>Пополните баланс</p>
        </div>
        <div className="balace-modal-buttons">
          <button type="button">Позже</button>
          <button type="button">Пополнить</button>
        </div>
      </div>
    </div>
  );
}
