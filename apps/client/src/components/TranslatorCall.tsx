import MainButton from "@shared/components/MainButton";
import "@shared/styles/translatorCall.css";
import type { Translator } from "../types";

interface Props {
  translator: Translator;
  onClick?: () => void;
}

export default function TranslatorCall({ translator, onClick }: Props) {
  return (
    <div className="translator-call-wrapper">
      <div className="translator-call-header">
        <h3
          className={
            translator.online ? "translator-online" : "translator-offline"
          }
        >
          Переводчик {translator.name}
        </h3>
        <p>{translator.theme}</p>
      </div>
      <div className="translator-call-main">
        <div className="translator-call-main-left">
          <img
            className="translator-call-photo"
            src={translator.photo}
            alt="translator-photo"
          />
          <div>
            <p>{translator.name}</p>
            <div className="translator-call-rating">
              <img src="/assets/home/red-star.png" alt="star" />
              <p>{translator.rating}</p>
            </div>
          </div>
        </div>
        <div className="translators-call-buttons">
          <button type="button" onClick={onClick}>
            <img
              src={
                translator.online
                  ? "/assets/home/call-online.png"
                  : "/assets/home/call-offline.png"
              }
              alt="call"
            />
          </button>
          <button>
            <img src="/assets/home/message-notif.png" alt="message" />
          </button>
        </div>
      </div>
      <div className="translator-call-footer">
        <p
          className="translator-call-footer-up"
          style={{ color: translator.online ? "#3AB500" : "#B50000" }}
        >
          {translator.online ? "Онлайн" : "Офлайн"}
        </p>
        <p className="translator-call-footer-up">{translator.status}</p>
        <p className="translator-call-footer-up">{translator.price} коинов</p>
        <p className="translator-call-footer-down">Доступность</p>
        <p className="translator-call-footer-down">Статус</p>
        <p className="translator-call-footer-down">1 минута</p>
      </div>
      <MainButton
        type="button"
        text={translator.online ? "Позвонить" : "Не доступен"}
        bgColor={translator.online ? "#3AB500" : "#C1C1C1"}
        disabled={!translator.online}
        className="button button-active"
        onClick={onClick}
      />
    </div>
  );
}
