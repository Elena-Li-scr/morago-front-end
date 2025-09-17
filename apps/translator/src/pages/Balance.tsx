import "@shared/styles/homePage.css";
import "../assets/style/listContacts.css";
import { CallCard } from "../components/user/CallCard";
import { useEffect, useState } from "react";
import { getCallHistory } from "@shared/services/translatorApi";
import type { CallFromApi } from "@shared/types/types";
import { callListSort } from "../utils/callListSort";

export default function Balance() {
  const [empyContact, setEmptyContact] = useState<boolean>(false);
  const [callData, setCallData] = useState<CallFromApi[]>([]);
  const fetchData = async () => {
    try {
      const res = await getCallHistory();
      const sortedCallList = callListSort(res.content);
      if (sortedCallList.length === 0) {
        setEmptyContact(true);
        return;
      }
      setCallData(sortedCallList);
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
              avatarUrl={call.imageUrl}
              name={call.name}
              theme={call.theme}
              time={call.duration}
              price={call.coins}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
