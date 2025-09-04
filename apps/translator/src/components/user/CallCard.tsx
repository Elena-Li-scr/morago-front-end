import { format, isThisWeek, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
  avatarUrl: string;
  name: string;
  theme: string;
  time: number;
  price: number;
  date?: string;
};

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minLabel = minutes === 1 ? "мин." : minutes >= 2 && minutes <= 4 ? "мин." : "мин.";
  const secLabel = seconds === 1 ? "сек" : seconds >= 2 && seconds <= 4 ? "сек" : "сек";
  const minText = minutes > 0 ? `${minutes} ${minLabel}` : "";
  const secText = seconds > 0 ? `${seconds} ${secLabel}` : "";
  return [minText, secText].filter(Boolean).join(" ");
};

export const CallCard = ({ avatarUrl, name, theme, time, price, date }: Props) => {
  const formatCallDate = (dateString: string): string => {
    const newDate = new Date(dateString);
    if (isToday(newDate)) {
      return format(newDate, "HH:mm");
    }
    if (isYesterday(newDate)) {
      return "Вчера";
    }
    if (isThisWeek(newDate, { weekStartsOn: 1 })) {
      return format(newDate, "EEEE", { locale: ru });
    }
    return format(newDate, "dd.MM.yyyy");
  };
  return (
    <div className="call-card">
      <div className="call-user">
        <img
          src={avatarUrl || "assets/images/user2.png"}
          alt={`avatar`}
          className="all-user-avatar"
        />
      </div>
      <div className="call-info">
        <p className="call-info-username">{name}</p>
        <p className="call-info-topic">{theme}</p>
      </div>
      {date ? (
        <div className="call-time">
          <p className="call-time-time">{formatCallDate(date)}</p>
        </div>
      ) : (
        <div className="call-time">
          <p className="call-time-price">{price.toLocaleString()} ₩</p>
          <p className="call-time-time">{formatTime(Number(time))}</p>
        </div>
      )}
    </div>
  );
};
