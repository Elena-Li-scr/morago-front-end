import "../assets/style/callPage.css";
import { useEffect, useState } from "react";
import { CallCard } from "../components/user/CallCard";
import { getCallHistory } from "@shared/services/translatorApi";

import type { CallFromApi } from "@shared/types/types";
import { callListSort } from "../utils/callListSort";

export default function CallHistory() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [callData, setCallData] = useState<CallFromApi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCallHistory("isLast");
        const sortedCallList = callListSort(res.content);
        setCallData(sortedCallList);
      } catch (err) {
        console.error("Ошибка при получении истории:", err);
      }
    };
    fetchData();
  }, []);

  const switchStatusHandler = async () => {
    const filter = isAvailable ? "isMissed" : "isLast";
    const result = await getCallHistory(filter);
    console.log(result);

    const sortedCallList = callListSort(result.content);
    setCallData(sortedCallList);
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
                avatarUrl={call.imageUrl}
                name={call.name}
                theme={call.theme}
                time={call.duration}
                price={call.coins}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
