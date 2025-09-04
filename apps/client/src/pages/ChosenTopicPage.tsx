import TranslatorInfo from "../components/TranslatorInfo";
import Theme from "@shared/components/Theme";
import SimpleHeader from "../components/SimpleHeader";
import MainFooter from "../components/MainFooter";
import TranslatorCall from "../components/TranslatorCall";
import { translators } from "@shared/utils/temporaryVar";
import { useTopicStore, useTranslatorStore, useIdTopicStore } from "@shared/store/useStore";
import { addLastChoosenThemes, getTranslatorsByTheme } from "@shared/services/clientApi";
import { useNavigate } from "react-router-dom";

import "@shared/styles/homePage.css";
import { useEffect } from "react";

export default function ChosenTopicPage() {
  const { selectedTranslator, setSelectedTranslator } = useTranslatorStore();
  const { chosenTopic, setChosenTopic } = useTopicStore();
  const { chosenTopicId, setChosenTopicId } = useIdTopicStore();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
    setChosenTopic("");
    setChosenTopicId("");
  };

  const callHandler = async () => {
    await addLastChoosenThemes({ id: chosenTopicId });
    navigate("/call");
  };

  useEffect(() => {
    const server = async () => {
      if (chosenTopicId) {
        const res = await getTranslatorsByTheme({ id: chosenTopicId });
        console.log(res.data.content);
      }
    };
    server();
  });

  return (
    <div className="page-wrapper">
      <SimpleHeader onClick={handleBack} />

      <div className="chosen-topic-main scroll-content">
        <h3>Выбранная тема</h3>
        <Theme theme={chosenTopic} />
        <div className="translators-list">
          <h3>Доступные переводчики</h3>
          {translators.map((translator, index) => (
            <TranslatorInfo
              key={index}
              translator={translator}
              onClick={() => setSelectedTranslator(translator)}
            />
          ))}
        </div>
      </div>
      <MainFooter page="main" />
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
