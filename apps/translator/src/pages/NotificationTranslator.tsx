import ChangePageBtn from "../components/buttons/ChangePageBtn";
import "../assets/style/notification.css";
import { BsExclamationCircle } from "react-icons/bs";
import { useEffect } from "react";
import { useNotificationStore } from "../components/hooks/useNotificationStore";
import { formatNotificationDate } from "../utils/formatInput";

export default function NotificationTranslator() {
  const { notifications, unreadCount, fetchNotifications, clearNotifications } =
    useNotificationStore();

  console.log(notifications);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container">
      <div className="verification change-password">
        <div className="change-password-header">
          <ChangePageBtn page="changePasswordIkconBack" />
          <h2 className="change-password-title">Уведомления</h2>
        </div>
        <div className="notification-sub-title">
          <div className="notification-sub-title-item">
            <p className="notification-sub-title-last">Последние</p>
            <p className="notification-sub-title-count">{unreadCount ? unreadCount : 0}</p>
          </div>
          <div className="notification-sub-title-item">
            <button
              disabled={unreadCount === 0}
              onClick={clearNotifications}
              className="notification-cleare"
            >
              Стереть всё
            </button>
          </div>
        </div>
        <div className="notification-items">
          {notifications.map((notify) => (
            <div key={notify.id} className="notification-item">
              <div className={`notification-item-icons  ${notify.isRead ? "isRead" : ""}`}>
                <BsExclamationCircle className="notification-item-icon" />
              </div>
              <div className="notification-item-info">
                <p className="notification-title">{notify.title}</p>
                <button className="notification-btn">Нажмите, чтобы просмотреть</button>
              </div>
              <p className="notification-time">{formatNotificationDate(notify.date)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
