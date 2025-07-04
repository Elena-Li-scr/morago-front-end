import Translator from "../components/Translator";
import Theme from "../components/Theme";
import SimpleHeader from "../components/SimpleHeader";
import HomeFooter from "../components/HomeFooter";
import { translators } from "../utils/temporaryVar";
import { useTopicStore } from "../store/useTopicStore";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css";

export default function ChosenTopicPage() {
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
          {translators.map((call, index) => (
            <Translator
              key={index}
              photo={call.photo}
              name={call.name}
              rating={call.rating}
              reviewsCount={call.reviewsCount}
              theme={call.theme}
            />
          ))}
        </div>
      </div>
      <HomeFooter page="main" />
    </div>
  );
}
