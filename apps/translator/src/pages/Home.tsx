import "@shared/styles/homePage.css";
import "../assets/style/listContacts.css";
import { CallCard } from "../components/user/CallCard";
import { callData } from "../constans/db";
import { useState } from "react";
import { compareDesc, parseISO } from "date-fns";

export default function Home() {
  const [empyContact, setEmptyContact] = useState<boolean>(false);
  const sortedCallData = [...callData].sort((a, b) =>
    compareDesc(parseISO(a.date), parseISO(b.date))
  );
  return (
    <div className="container">
      <div className="home-page">
        <h4>История звонков</h4>
        {empyContact ? (
          <div className="list-contact-empty">Нет истории звонков</div>
        ) : (
          <div className="list-contact">
            {sortedCallData.map((call) => (
              <CallCard
                key={call.id}
                avatarUrl={call.avatarUrl}
                name={call.name}
                topic={call.topic}
                time={call.time}
                price={call.price}
                date={call.date}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
