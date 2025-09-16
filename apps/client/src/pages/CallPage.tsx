import "@shared/styles/calls.css";
import { useTranslatorStore } from "@shared/store/useStore";
import { useNavigate } from "react-router-dom";
import { createCall } from "@shared/services/clientApi";
import { useEffect } from "react";

export default function CallPage() {
  const { selectedTranslator } = useTranslatorStore();
  const navigate = useNavigate();

  const offCall = () => {
    navigate(-1);
  };

  useEffect(() => {
    const callUser = async () => {
      if (!selectedTranslator) return;
      const recipientId = selectedTranslator.id;

      const payload = {
        recipientId,
        themeId: 25,
      };
      await createCall(payload);
    };
    callUser();
  });

  if (!selectedTranslator) {
    return (
      <div className="call-page-wrapper">
        <p>Переводчик не выбран</p>
        <button className="call-off-button" type="button" onClick={offCall}>
          Назад
        </button>
      </div>
    );
  }
  return (
    <div className="call-page-wrapper">
      <div className="call-header">
        <img src="/assets/home/morago.png" alt="morago" />
      </div>
      <div className="call-main">
        <div>
          <p className="call-translator-name">{selectedTranslator.nameWithInitials}</p>
          <img
            src={
              selectedTranslator.imageUrl
                ? `http://localhost:8080/uploads/${selectedTranslator.imageUrl}`
                : "/assets/profile/temporary-photo.png"
            }
            alt="translator-photo"
            className="call-main-photo"
          />
        </div>
        <div>
          <div className="call-buttons">
            <button type="button">
              <div className="call-img-cover">
                <img src="/assets/call/mute-off.png" alt="mute-button" className="mute-button" />
              </div>
              Mute
            </button>
            <button type="button">
              <div className="call-img-cover">
                <img src="/assets/call/photo-off.png" alt="photo-button" className="photo-button" />
              </div>
              Photo
            </button>
            <button type="button">
              <div className="call-img-cover call-img-cover-active">
                <img
                  src="/assets/call/speaker-on.png"
                  alt="speaker-button"
                  className="speaker-button"
                />
              </div>
              Speaker
            </button>
          </div>
          <button className="call-off-button" type="button" onClick={offCall}>
            <img src="/assets/call/call-off.png" alt="call-off" />
          </button>
        </div>
      </div>
    </div>
  );
}
