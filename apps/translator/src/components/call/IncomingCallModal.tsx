import { useCall } from "@shared/components/webRtc/useCall";
import "../../assets/style/call.css";

const DEFAULT_AVATAR_URL = "/assets/images/user2.png";

export const IncomingCallModal = () => {
  const { incomingCall, callStatus, acceptCall, rejectCall } = useCall();

  if (!incomingCall || callStatus !== "ringing") return null;
  return (
    <div className="modal-overlay">
      <div className="container">
        <div className="incoming-call-modal">
          <div className="incoming-call-title">
            <p className="incoming-call">Входящий звонок</p>
            <p className="incoming-call-theme">Тема: {incomingCall.theme}</p>
          </div>
          <div className="incoming-call-block">
            <img
              src={`${incomingCall.photoUrl ?? DEFAULT_AVATAR_URL}`}
              className="incoming-call-img"
              alt="Аватар"
            />
            <p className="incoming-call-block-user">{incomingCall.toUserId}</p>
          </div>
          <div className="incoming-call-block">
            <div className="incoming-call-block-item">
              <p className="incoming-call-block-title">Первый звонок</p>
              <p className="incoming-call-block-text">Статус </p>
            </div>
            <div className="incoming-call-block-item">
              <p className="incoming-call-block-title">{incomingCall.costPerMinute} коинов</p>
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
          <button className="button button-call" onClick={acceptCall}>
            Принять звонок
          </button>
          <button className="button button-call-reject" onClick={rejectCall}>
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};
