import "@shared/styles/calls.css";
import { useTranslatorStore } from "@shared/store/useStore";
import { useEffect, useRef, useState } from "react";
import { useCall } from "@shared/components/webRtc/useCall";

const formatTime = (s: number) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

export default function CallPage() {
  const { selectedTranslator } = useTranslatorStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { callStatus, endCall } = useCall();
  const [serverError, setServerError] = useState("");

  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current != null) return;
    setSeconds(0);
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };
  const stopTimer = () => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const offCall = () => {
    endCall();
    stopTimer();
  };

  useEffect(() => {
    if (callStatus === "in-call") {
      startTimer();
    } else if (callStatus === "ended" || callStatus === "rejected" || callStatus === "timeout") {
      stopTimer();
    }
  }, [callStatus]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleSpeaker = () => {
    setIsSpeakerOn((prev) => !prev);
  };
  if (
    callStatus === "idle" ||
    callStatus === "ended" ||
    callStatus === "rejected" ||
    callStatus === "timeout"
  ) {
    return null;
  }

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
          {serverError && <p style={{ textAlign: "center", marginTop: 8 }}>{serverError}</p>}
          <p style={{ textAlign: "center", marginTop: 8 }}>Статус: {status}</p>
          <p style={{ textAlign: "center", marginTop: 8 }} className="call-timer">
            {formatTime(seconds)}
          </p>
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
            <button type="button" onClick={handleMute}>
              <div className={isMuted ? "call-img-cover call-img-cover-active" : "call-img-cover"}>
                <img
                  src={!isMuted ? "/assets/call/mute-off.png" : "/assets/call/mute-on.png"}
                  alt="mute-button"
                  className="mute-button"
                />
              </div>
              Mute
            </button>
            <button type="button">
              <div className="call-img-cover">
                <img src="/assets/call/photo-off.png" alt="photo-button" className="photo-button" />
              </div>
              Photo
            </button>
            <button type="button" onClick={handleSpeaker}>
              <div
                className={!isSpeakerOn ? "call-img-cover call-img-cover-active" : "call-img-cover"}
              >
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
