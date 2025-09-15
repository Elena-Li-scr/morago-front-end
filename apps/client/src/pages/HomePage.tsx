import HomeHeader from "../components/HomeHeader";
import ThemePage from "../components/ThemePage";
import FirstCallModal from "../components/FirstCallModal";
// import InsufficientModal from "../components/InsufficientModal";
import TranslatorInfo from "../components/TranslatorInfo";
import MainFooter from "../components/MainFooter";
// import { translators } from "@shared/utils/temporaryVar";
import { getLastCalls, getAllCalls } from "@shared/services/clientApi";
import { useFirstCall } from "@shared/store/useStore";
import { useEffect, useState } from "react";
import "@shared/styles/homePage.css";

export default function HomePage() {
  const { isFirstCall, setIsFirstCall } = useFirstCall();
  const [translators, setTranslators] = useState([]);

  useEffect(() => {
    const server = async () => {
      try {
        const lastCalls = await getLastCalls();
        const allCalls = await getAllCalls();
        if (allCalls.data.content.length !== 0) setIsFirstCall(false);
        setTranslators(lastCalls.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    server();
  }, [setIsFirstCall]);

  return (
    <div className="page-wrapper">
      <HomeHeader />
      <div className="scroll-content">
        <ThemePage />
        {translators && (
          <div className="home-last-calls">
            <h3>Мои последние звонки</h3>
            <div className="last-calls-list">
              {translators.map((translator, index) => (
                <TranslatorInfo key={index} translator={translator} />
              ))}
            </div>
          </div>
        )}
      </div>
      <MainFooter page="main" />
      {isFirstCall && <FirstCallModal />}
      {/* {showBanner && <InsufficientModal />} */}
    </div>
  );
}
