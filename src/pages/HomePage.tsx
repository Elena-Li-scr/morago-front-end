import HomeHeader from "../components/HomeHeader";
import ThemePage from "../components/ThemePage";
import FirstCallModal from "../components/FirstCallModal";
import InsufficientModal from "../components/InsufficientModal";
import Translator from "../components/Translator";
import HomeFooter from "../components/HomeFooter";
import { translators } from "../utils/temporaryVar";
import "../styles/homePage.css";

export default function HomePage() {
  const showBanner = false;

  return (
    <div className="home-page-wrapper">
      <HomeHeader />
      <ThemePage />
      <div className="home-last-calls">
        <h3>Мои последние звонки</h3>
        <div className="last-calls-list">
          {translators.map((call, index) => (
            <Translator
              key={index}
              photo={call.photo}
              name={call.name}
              rating={call.rating}
              reviewsCount={call.reviewsCount}
              theme={call.theme}
              time={call.time}
            />
          ))}
        </div>
      </div>
      <HomeFooter page="main" />
      {showBanner && <FirstCallModal />}
      {/* {showBanner && <InsufficientModal />} */}
    </div>
  );
}
