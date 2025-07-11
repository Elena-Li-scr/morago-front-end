import HomeHeader from "../../shared/components/HomeHeader";
import ThemePage from "../../shared/components/ThemePage";
import FirstCallModal from "../../shared/components/FirstCallModal";
// import InsufficientModal from "../../shared/components/InsufficientModal";
import Translator from "../../shared/components/Translator";
import MainFooter from "../../shared/components/MainFooter";
import { translators } from "../../shared/utils/temporaryVar";
import "../../shared/styles/homePage.css";

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
