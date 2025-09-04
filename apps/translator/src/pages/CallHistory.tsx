import "../assets/style/callPage.css";
import { useEffect, useState } from "react";
import { CallCard } from "../components/user/CallCard";
import { getCallHistory } from "../api/services/services";
import type { CallHisrtoryTranslator } from "../types/types";

export default function CallHistory() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [callData, setCallData] = useState<CallHisrtoryTranslator[]>([]);

  const fetchData = async () => {
    try {
      const response = await getCallHistory("isLast");
      setCallData(response);
    } catch (err) {
      console.error("Ошибка при получении истории:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const switchStatusHandler = async () => {
    const filter = isAvailable ? "isMissed" : "isLast";
    // const result = await getCallHistory(filter);
    // setCallData(result);
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="container">
      <div className="call-page">
        <div className="toggle-call-background">
          <div className={`toggle-call-slider  ${isAvailable ? "left" : "right"}`}></div>

          <button
            className={`toggle-call-option  ${isAvailable ? "active" : ""}`}
            onClick={switchStatusHandler}
          >
            Все
          </button>
          <button
            className={`toggle-call-option  ${!isAvailable ? "active " : ""}`}
            onClick={switchStatusHandler}
          >
            Пропущенные
          </button>
        </div>
        <h4 className="call-page-title">Недавние</h4>
        <div className="list-contact">
          {callData.length === 0 ? (
            <div className="list-contact-empty">Нет истории звонков</div>
          ) : (
            callData.map((call) => (
              <CallCard
                key={call.id}
                avatarUrl={call.avatarUrl}
                name={call.name}
                theme={call.theme}
                time={call.time}
                price={call.price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
