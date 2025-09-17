import { useEffect, useState } from "react";
import { useCall } from "./useCall";
import LogoHeader from "../headers_footers/LogoHeader";
import { BsFillMicMuteFill } from "react-icons/bs";
import { HiVolumeUp } from "react-icons/hi";
import { MdCallEnd } from "react-icons/md";

const formatTime = (s: number) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

export const CallModal = () => {
  const { incomingCall, callStatus, currentCall, endCall } = useCall();
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    if (callStatus !== "in-call") {
      setSeconds(0);
      return;
    }
    const id = setInterval(() => setSeconds((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [callStatus]);

  if (callStatus !== "in-call" || !currentCall) return null;

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleSpeaker = () => {
    setIsSpeakerOn((prev) => !prev);
  };

  return (
    <div className="call-modal">
      <LogoHeader notifiIcon={false} backIcon={false} />
      <div className="container">
        <h2 className="call-user-name">{incomingCall?.callId}</h2>
        <p className="call-timer">{formatTime(seconds)}</p>
        <img src={incomingCall?.photoUrl} alt="caller" className="caller-photo" />
        <div className="call-icons-bnts">
          <button className="call-icons-btn" onClick={handleMute}>
            <BsFillMicMuteFill className={`call-icon ${isMuted ? "active" : ""}`} />
            <p className="call-icon-text">Mute</p>
          </button>
          <button className="call-icons-btn" onClick={handleSpeaker}>
            <HiVolumeUp className={`call-icon ${isSpeakerOn ? "active" : ""}`} />
            <p className="call-icon-text">Speaker</p>
          </button>
        </div>
        <button className="end-call-btn" onClick={endCall}>
          <MdCallEnd className="call-icon call-end" />
        </button>
      </div>
    </div>
  );
};
