import "../assets/style/callPage.css";
import { useState } from "react";
import { CallCard } from "../components/user/CallCard";
import { callData, callMissed } from "../constans/db";
import { compareDesc, parseISO } from "date-fns";

export default function CallHistory() {
  const [isAvailable, setIsAvailable] = useState(true);

  const sortedCallData = [...callData].sort((a, b) =>
    compareDesc(parseISO(a.date), parseISO(b.date))
  );
  const sortedMissedCalls = [...callMissed].sort((a, b) =>
    compareDesc(parseISO(a.date), parseISO(b.date))
  );

  const displayedCalls = isAvailable ? sortedCallData : sortedMissedCalls;
  return (
    <div className="container">
      <div className="call-page">
        <div className="toggle-call-background">
          <div
            className={`toggle-call-slider  ${isAvailable ? "left" : "right"}`}
          ></div>

          <button
            className={`toggle-call-option  ${isAvailable ? "active" : ""}`}
            onClick={() => setIsAvailable(true)}
          >
            Все
          </button>
          <button
            className={`toggle-call-option  ${!isAvailable ? "active " : ""}`}
            onClick={() => setIsAvailable(false)}
          >
            Пропущенные
          </button>
        </div>
        <h4 className="call-page-title">Недавние</h4>
        <div className="list-contact">
          {displayedCalls.length === 0 ? (
            <div className="list-contact-empty">Нет истории звонков</div>
          ) : (
            displayedCalls.map((call) => (
              <CallCard
                key={call.id}
                avatarUrl={call.avatarUrl}
                name={call.name}
                topic={call.topic}
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
