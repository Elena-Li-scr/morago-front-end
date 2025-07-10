import HomeHeader from "../components/HomeHeader";
import ThemePage from "../components/ThemePage";
import FirstCallModal from "../components/FirstCallModal";
import InsufficientModal from "../components/InsufficientModal";
import Translator from "../components/Translator";
import MainFooter from "../components/MainFooter";
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
          {translators.map((translator, index) => (
            <Translator key={index} translator={translator} />
          ))}
        </div>
      </div>
      <MainFooter page="main" />
      {showBanner && <FirstCallModal />}
      {/* {showBanner && <InsufficientModal />} */}
    </div>
  );
}
