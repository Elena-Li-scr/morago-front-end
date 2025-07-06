import Translator from "../components/Translator";
import Theme from "../components/Theme";
import SimpleHeader from "../components/SimpleHeader";
import HomeFooter from "../components/HomeFooter";
import TranslatorCall from "../components/TranslatorCall";
import { translators } from "../utils/temporaryVar";
import { useTopicStore } from "../store/useTopicStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/homePage.css";

interface Translator {
  name: string;
  theme: string;
  rating: number;
  photo: string;
  online: boolean;
  status: string;
  price: number;
}

export default function ChosenTopicPage() {
  const [selectedTranslator, setSelectedTranslator] =
    useState<Translator | null>(null);
  const { chosenTopic } = useTopicStore();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="chosen-topic-wrapper">
      <SimpleHeader onClick={handleBack} />

      <div className="chosen-topic-main">
        <h3>Выбранная тема</h3>
        <Theme theme={chosenTopic} />
        <div className="translators-list">
          <h3>Доступные переводчики</h3>
          {translators.map((translator, index) => (
            <Translator
              key={index}
              translator={translator}
              onClick={() => setSelectedTranslator(translator)}
            />
          ))}
        </div>
      </div>
      <HomeFooter page="main" />
      {selectedTranslator && (
        <div className="modal-window-wrapper">
          <TranslatorCall translator={selectedTranslator} />
        </div>
      )}
    </div>
  );
}
