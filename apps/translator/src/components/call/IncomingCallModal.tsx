import { useCall } from "./useCall";
import "../../assets/style/call.css";

export const IncomingCallModal = () => {
  const { incomingCall, setIncomingCall, setCallStatus, callStatus } = useCall();

  if (!incomingCall || callStatus === "active") return null;

  const handleAccept = () => {
    console.log("Принят звонок");
    setCallStatus("active");
    document.body.style.overflow = "hidden";
    // setIncomingCall(null);
  };

  const handleDecline = () => {
    console.log("Отклонён звонок");
    document.body.style.overflow = "scroll";
    setIncomingCall(null);
  };

  return (
    <div className="modal-overlay">
      <div className="container">
        <div className="incoming-call-modal">
          <div className="incoming-call-title">
            <p className="incoming-call">Входящий звонок</p>
            <p className="incoming-call-theme">Тема: {incomingCall.topic}</p>
          </div>
          <div className="incoming-call-block">
            <img src={incomingCall.photoUrl} className="incoming-call-img" alt="Аватар" />
            <p className="incoming-call-block-user">{incomingCall.name}</p>
          </div>
          <div className="incoming-call-block">
            <div className="incoming-call-block-item">
              <p className="incoming-call-block-title">Первый звонок</p>
              <p className="incoming-call-block-text">Статус </p>
            </div>
            <div className="incoming-call-block-item">
              <p className="incoming-call-block-title">{incomingCall.coins} коинов</p>
              <p className="incoming-call-block-text">1 минута</p>
            </div>
          </div>
          <div className="incoming-call-memo">
            <h3>Памятка</h3>
            <ol>
              <li>Представьтесь</li>
              <li>Говорите уважительно </li>
              <li>Что-нибудь еще </li>
              <li>И тут что-то написать </li>
              <li>Готово</li>
            </ol>
          </div>
          <button className="button button-call" onClick={handleAccept}>
            Принять звонок
          </button>
          <button className="button button-call-reject" onClick={handleDecline}>
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};
