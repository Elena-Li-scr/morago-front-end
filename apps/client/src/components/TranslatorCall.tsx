import MainButton from "@shared/components/MainButton";
import "@shared/styles/translatorCall.css";
import type { TranslatorById } from "src/types";
import { addLastChoosenThemes, createCall, getTranslatorsById } from "@shared/services/clientApi";
import { useEffect, useState } from "react";
import { useCall } from "@shared/components/webRtc/useCall";
import { useIdTopicStore, useModalStore, useTranslatorStore } from "@shared/store/useStore";
import InsufficientModal from "../components/InsufficientModal";
import axios from "axios";

export default function TranslatorCall() {
  const { loading } = useModalStore();
  const { selectedTranslator, setSelectedTranslator } = useTranslatorStore();
  const [translatorCall, setTranslatorCall] = useState<TranslatorById | null>(null);
  const { chosenTopicId, setChosenTopicId } = useIdTopicStore();
  const [showBanner, setShowBanner] = useState(false);
  const { markCalling } = useCall();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (!selectedTranslator) return;
    (async () => {
      try {
        const res = await getTranslatorsById({ id: selectedTranslator.id });
        if (isMounted) setTranslatorCall(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [selectedTranslator]);

  if (!translatorCall || !selectedTranslator || loading) return;

  const onCall = async () => {
    try {
      const payload = {
        recipientId: selectedTranslator.id,
        themeId: chosenTopicId,
      };
      const res = await createCall(payload);
      await addLastChoosenThemes({ id: chosenTopicId });

      markCalling(res.data); // теперь статус станет "calling" до accept/reject
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "Caller balance is negative") {
          setShowBanner(true);
        } else {
          setServerError("Произошла ошибка. Попробуйте снова.");
        }
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };

  return (
    <div
      className="modal-window-wrapper"
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          setSelectedTranslator(null);
        }
      }}
    >
      <div className="translator-call-wrapper">
        <div className="translator-call-header">
          <h3 className={translatorCall.isOnline ? "translator-online" : "translator-offline"}>
            Переводчик {translatorCall.firstName} {translatorCall.lastName}`
          </h3>
          <p>{selectedTranslator.theme}</p>
        </div>
        <div className="translator-call-main">
          <div className="translator-call-main-left">
            <img
              className="translator-call-photo"
              src={
                selectedTranslator.imageUrl
                  ? `http://localhost:8080/uploads/${selectedTranslator.imageUrl}`
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
            <button type="button" onClick={onCall}>
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
          onClick={onCall}
        />
      </div>

      {showBanner && <InsufficientModal />}
    </div>
  );
}
