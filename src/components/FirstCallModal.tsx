import "../styles/firstCallModal.css";

export default function FirstCallModal() {
  return (
    <div className="modal-window-wrapper">
      <div className="modal-window">
        <h2>ПЕРВЫЙ ЗВОНОК БЕСПЛАТНЫЙ!</h2>
        <p>
          Попробуйте сервис Мораго <br /> транслейт за наш счёт
        </p>
        <img
          className="banner-img"
          src="/assets/home/free-call-banner.png"
          alt="banner"
        />
        <button type="button" className="modal-window-button">
          Попробовать
        </button>
      </div>
    </div>
  );
}
