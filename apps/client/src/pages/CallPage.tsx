import "@shared/styles/calls.css";
import { useTranslatorStore } from "@shared/store/useStore";
import { useNavigate } from "react-router-dom";

export default function CallPage() {
  const { selectedTranslator } = useTranslatorStore();
  const navigate = useNavigate();

  const offCall = () => {
    navigate(-1);
  };
  return (
    <div className="call-page-wrapper">
      <div className="call-header">
        <img src="/assets/home/morago.png" alt="morago" />
      </div>
      <div className="call-main">
        <p className="call-translator-name">{selectedTranslator?.name}</p>
        <img src={selectedTranslator?.photo} alt="translator-photo" />
        <div className="call-buttons">
          <button type="button">
            <div className="call-img-cover">
              <img
                src="/assets/call/mute-off.png"
                alt="mute-button"
                className="mute-button"
              />
            </div>
            Mute
          </button>
          <button type="button">
            <div className="call-img-cover">
              <img
                src="/assets/call/photo-off.png"
                alt="photo-button"
                className="photo-button"
              />
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
  );
}
