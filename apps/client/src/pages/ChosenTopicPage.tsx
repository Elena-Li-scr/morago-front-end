import TranslatorInfo from "../components/TranslatorInfo";
import Theme from "@shared/components/Theme";
import SimpleHeader from "../components/SimpleHeader";
import MainFooter from "../components/MainFooter";
import { useTopicStore, useTranslatorStore, useIdTopicStore } from "@shared/store/useStore";
import { getTranslatorsByTheme } from "@shared/services/clientApi";
import { useNavigate } from "react-router-dom";

import "@shared/styles/homePage.css";
import { useEffect, useState } from "react";

export default function ChosenTopicPage() {
  const { setSelectedTranslator } = useTranslatorStore();
  const { chosenTopic, setChosenTopic } = useTopicStore();
  const { chosenTopicId, setChosenTopicId } = useIdTopicStore();
  const [translators, setTranslators] = useState([]);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
    setChosenTopic("");
    setChosenTopicId("");
  };

  useEffect(() => {
    const server = async () => {
      try {
        if (chosenTopicId) {
          const res = await getTranslatorsByTheme({ id: chosenTopicId });
          setTranslators(res.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    };
    server();
  }, [chosenTopicId]);

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
    </div>
  );
}
