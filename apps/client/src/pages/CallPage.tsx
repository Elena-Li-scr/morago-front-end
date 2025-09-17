import "@shared/styles/calls.css";
import { useTranslatorStore, useIdTopicStore } from "@shared/store/useStore";
import { useNavigate } from "react-router-dom";
import { createCall } from "@shared/services/clientApi";
import { useEffect, useRef, useState } from "react";
import { createStomp } from "../lib/StompClient.ts";
import InsufficientModal from "../components/InsufficientModal";
import axios from "axios";

const formatTime = (s: number) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

type CallStatus = "idle" | "ringing" | "accepted" | "rejected" | "timeout" | "ended";
type CallPayload = {
  callId: string;
  fromUserId: string;
  toUserId: string;
  theme: string;
  photoUrl: string;
  costPerMinute: string;
};

export default function CallPage() {
  const { selectedTranslator } = useTranslatorStore();
  const { chosenTopicId } = useIdTopicStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const stompRef = useRef<ReturnType<typeof createStomp> | null>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<CallStatus>("idle");
  const [currentCall, setCurrentCall] = useState<CallPayload | null>(null);
  const [showBanner, setShowBanner] = useState(false);
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
    if (!currentCall || !stompRef.current) return;
    stompRef.current.publish({
      destination: "/app/call/end",
      body: JSON.stringify({ callId: currentCall.callId }),
    });
    stopTimer();
    navigate(-1);
  };

  useEffect(() => {
    if (!selectedTranslator) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const client = createStomp();
    stompRef.current = client;

    let unsubs: Array<() => void> = [];

    client.onConnect = () => {
      const s1 = client.subscribe("/user/queue/incoming-call", () => setStatus("ringing"));
      const s2 = client.subscribe("/user/queue/call-started", () => {
        setStatus("accepted");
      });
      const s3 = client.subscribe("/user/queue/call-rejected", () => {
        setStatus("rejected");
        navigate(-1);
      });
      const s4 = client.subscribe("/user/queue/call-timeout", () => setStatus("timeout"));
      const s5 = client.subscribe("/user/queue/call-ended", () => {
        setStatus("ended");
        navigate(-1);
      });

      unsubs = [s1, s2, s3, s4, s5].map((sub) => () => sub.unsubscribe());

      (async () => {
        try {
          const res = await createCall({
            recipientId: selectedTranslator.id,
            themeId: chosenTopicId,
          });
          setCurrentCall(res.data);
          setStatus("ringing");
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
      })();
    };

    client.onStompError = (frame) => {
      console.error("[STOMP ERROR]", frame.headers["message"], frame.body);
    };
    client.onWebSocketError = (ev) => {
      console.error("[WS ERROR]", ev);
    };

    client.activate();

    return () => {
      unsubs.forEach((u) => u());
      client.deactivate();
      stompRef.current = null;
      startedRef.current = false;
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTranslator, chosenTopicId]);

  useEffect(() => {
    if (status === "accepted") {
      startTimer();
    } else if (status === "ended" || status === "rejected" || status === "timeout") {
      stopTimer();
    }
  }, [status]);

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

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleSpeaker = () => {
    setIsSpeakerOn((prev) => !prev);
  };
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
      {showBanner && <InsufficientModal />}
    </div>
  );
}
