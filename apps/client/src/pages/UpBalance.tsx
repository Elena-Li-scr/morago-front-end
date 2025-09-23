import { useEffect, useState } from "react";
import BalanceHeader from "../components/BalanceHeader";
import MainFooter from "../components/MainFooter";
import { getLastCalls } from "@shared/services/clientApi";
import type { Translator } from "../types";
export default function UpBalance() {
  const [translators, setTranslators] = useState<Translator[]>([]);
  useEffect(() => {
    const server = async () => {
      const lastCalls = await getLastCalls();
      setTranslators(lastCalls.data.content);
    };
    server();
  }, []);

  return (
    <div className="page-wrapper">
      <BalanceHeader />
      <div className="detailing scroll-content">
        <h3>Детализация</h3>
        <div className="prev-calling-list">
          {translators.map((translator, index) => (
            <div className="prev-call-detail" key={index}>
              <img
                src={
                  translator.imageUrl
                    ? `http://localhost:8080${translator.imageUrl}`
                    : "/assets/profile/temporary-photo.png"
                }
                alt="translator-photo"
              />
              <div className="prev-call-main">
                <p>{translator.name}</p>
                <div className="prev-call-theme-time">
                  <p>{translator.theme}</p>
                  <div className="prev-call-time">{translator.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MainFooter page="main" />
    </div>
  );
}
