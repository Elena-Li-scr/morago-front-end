import "@shared/styles/notification.css";
import { formatDistanceToNowStrict } from "date-fns";
import BackButton from "@shared/components/BackButton";
import { clearAllNote, getNotifications } from "@shared/services/clientApi";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  text: string;
  date: string;
  isRead: boolean;
}
export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const shortFormat = (dateString: string): string => {
    const date = new Date(dateString.replace(" ", "T"));
    return formatDistanceToNowStrict(date, { addSuffix: true });
  };

  const handleShowText = (index: number) => {
    setOpenedIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    try {
      const server = async () => {
        const res = await getNotifications();
        setNotifications(res.data.content);
      };
      server();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clearAll = async () => {
    try {
      const res = await clearAllNote();
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notifications-wrapper">
      <div className="notifications-header">
        <BackButton icon="/assets/arrow-left.png" />
        <h3>Уведомления</h3>
      </div>
      <div className="notifications-main">
        <div className="notifications-main-header">
          <div>
            <h4>Последние</h4>
            <span>{notifications.length}</span>
          </div>
          <button type="button" className="clean-notifications" onClick={clearAll}>
            Стереть всё
          </button>
        </div>
        <div className="notifications-main-list">
          {notifications.map((note, index) => (
            <div className="notifications-main-item-wrapper" key={index}>
              <div className="notifications-main-item">
                <img src="/assets/note.png" alt="information" />
                <div>
                  <p className="item-title">{note.title}</p>

                  <button type="button" onClick={() => handleShowText(index)}>
                    Нажмите, чтобы
                    {openedIndex === index ? " закрыть" : " просмотреть"}
                  </button>
                </div>
                <p className="item-time">{shortFormat(note.date)}</p>
              </div>
              {openedIndex === index && <div className="item-body">{note.text}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
