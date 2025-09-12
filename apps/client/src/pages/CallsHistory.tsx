import "@shared/styles/calls.css";
import MainFooter from "../components/MainFooter";
import TranslatorInfoSimple from "../components/TranslatorInfoSimple";
import TranslatorCall from "../components/TranslatorCall";
import { useTranslatorStore } from "@shared/store/useStore";
import { translators, missed } from "@shared/utils/temporaryVar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMissedCalls, getLastCalls } from "@shared/services/clientApi";
export default function CallsHistory() {
  const [allCalls, setAllCalls] = useState(true);
  const { selectedTranslator, setSelectedTranslator } = useTranslatorStore();
  const navigate = useNavigate();

  const callHandler = () => {
    navigate("/call");
  };

  useEffect(() => {
    const server = async () => {
      try {
        const lastCalls = await getLastCalls();
        const missedCalls = await getMissedCalls();
        console.log(lastCalls.data, missedCalls.data);
      } catch (error) {
        console.log(error);
      }
    };
    server();
  });

  return (
    <div className="call-history-wrapper">
      <div className="call-header">
        <img src="/assets/home/morago.png" alt="morago" />
      </div>
      <div className="call-history-main scroll-content">
        <div className="calls-history-selectors">
          <button
            type="button"
            onClick={() => setAllCalls(true)}
            className={
              !allCalls ? "call-history-button" : "call-history-button call-history-button-active"
            }
          >
            Все
          </button>
          <button
            type="button"
            onClick={() => setAllCalls(false)}
            className={
              allCalls ? "call-history-button" : "call-history-button call-history-button-active"
            }
          >
            Пропущенные
          </button>
        </div>
        <div className="recent-calls">
          <h3>Недавние</h3>
          {allCalls ? (
            <div className="recent-calls-list">
              {translators.map((translator, index) => (
                <TranslatorInfoSimple
                  key={index}
                  translator={translator}
                  onClick={() => setSelectedTranslator(translator)}
                />
              ))}
            </div>
          ) : (
            <div className="recent-calls-list">
              <div className="recent-calls-list">
                {missed.map((translator, index) => (
                  <TranslatorInfoSimple
                    key={index}
                    translator={translator}
                    onClick={() => setSelectedTranslator(translator)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <MainFooter page="phone" />
      {selectedTranslator && (
        <div
          className="modal-window-wrapper"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedTranslator(null);
            }
          }}
        >
          <TranslatorCall translator={selectedTranslator} onClick={callHandler} />
        </div>
      )}
    </div>
  );
}
