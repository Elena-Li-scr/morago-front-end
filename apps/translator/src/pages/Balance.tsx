import "@shared/styles/homePage.css";
import "../assets/style/listContacts.css";
import { CallCard } from "../components/user/CallCard";
import { callData } from "../constans/db";
import { useState } from "react";

export default function Balance() {
  const [empyContact, setEmptyContact] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="home-page">
        <h4>Детализация</h4>
        <div className="list-contact">
          {empyContact && (
            <div className="list-contact-empty">Нет истории звонков</div>
          )}
          {callData.map((call) => (
            <CallCard
              key={call.id}
              avatarUrl={call.avatarUrl}
              name={call.name}
              topic={call.topic}
              time={call.time}
              price={call.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
