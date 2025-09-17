import MainButton from "@shared/components/MainButton";
import "@shared/styles/translatorCall.css";
import type { TranslatorByTheme, TranslatorById } from "src/types";
import { getTranslatorsById } from "@shared/services/clientApi";
import { useEffect, useState } from "react";

interface Props {
  translator: TranslatorByTheme;
  onClick?: () => void;
}

export default function TranslatorCall({ translator, onClick }: Props) {
  const [translatorCall, setTranslatorCall] = useState<TranslatorById | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await getTranslatorsById({ id: translator.id });
        if (isMounted) setTranslatorCall(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [translator.id]);
  if (!translatorCall) return;

  return (
    <div className="translator-call-wrapper">
      <div className="translator-call-header">
        <h3 className={translatorCall.isOnline ? "translator-online" : "translator-offline"}>
          Переводчик {translatorCall.firstName} {translatorCall.lastName}`
        </h3>
        <p>{translator.theme}</p>
      </div>
      <div className="translator-call-main">
        <div className="translator-call-main-left">
          <img
            className="translator-call-photo"
            src={
              translatorCall.imageUrl
                ? `http://localhost:8080/uploads/${translatorCall.imageUrl}`
                : "/assets/profile/temporary-photo.png"
            }
            alt="translator-photo"
          />
          <div>
            <p>
              {translatorCall.firstName} {translatorCall.lastName}
            </p>
            <div className="translator-call-rating">
              <img src="/assets/home/red-star.png" alt="star" />
              <p>{translatorCall.rating}</p>
            </div>
          </div>
        </div>
        <div className="translators-call-buttons">
          <button type="button" onClick={onClick}>
            <img
              src={
                translatorCall.isOnline
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
          style={{ color: translatorCall.isOnline ? "#3AB500" : "#B50000" }}
        >
          {translatorCall.isOnline ? "Онлайн" : "Офлайн"}
        </p>
        <p className="translator-call-footer-up">
          {translatorCall.status ? translatorCall.status : "Верифицирован"}
        </p>
        <p className="translator-call-footer-up">
          {translatorCall.price ? translatorCall.price : 1000} коинов
        </p>
        <p className="translator-call-footer-down">Доступность</p>
        <p className="translator-call-footer-down">Статус</p>
        <p className="translator-call-footer-down">1 минута</p>
      </div>
      <MainButton
        type="button"
        text={translatorCall.isOnline ? "Позвонить" : "Не доступен"}
        bgColor={translatorCall.isOnline ? "#3AB500" : "#C1C1C1"}
        disabled={!translatorCall.isOnline}
        className="button button-active"
        onClick={onClick}
      />
    </div>
  );
}
