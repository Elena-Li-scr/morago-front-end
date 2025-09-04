import "@shared/styles/homePage.css";
import "../assets/style/listContacts.css";
import { CallCard } from "../components/user/CallCard";
import { useEffect, useState } from "react";
import { getCallHistory } from "../api/services/services";
import type { CallHisrtoryTranslator } from "../types/types";

export default function Balance() {
  const [empyContact, setEmptyContact] = useState<boolean>(false);
  const [callData, setCallData] = useState<CallHisrtoryTranslator[]>([]);
  const fetchData = async () => {
    try {
      const response = await getCallHistory();
      if (response.length === 0) {
        setEmptyContact(true);
        return;
      }
      setCallData(response);
    } catch (err) {
      console.error("Ошибка при получении истории:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="home-page">
        <h4>Детализация</h4>
        <div className="list-contact">
          {empyContact && <div className="list-contact-empty">Нет истории звонков</div>}
          {callData.map((call) => (
            <CallCard
              key={call.id}
              avatarUrl={call.avatarUrl}
              name={call.name}
              theme={call.theme}
              time={call.time}
              price={call.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
