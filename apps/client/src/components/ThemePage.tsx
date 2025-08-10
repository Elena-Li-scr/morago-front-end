import Theme from "@shared/components/Theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopicStore } from "@shared/store/useStore";
import { getPopularThemes } from "@shared/services/clientApi";

import "@shared/styles/homePage.css";
import "@shared/styles/theme.css";

export default function ThemePage() {
  const popularThemes: string[] = [
    "Банк",
    "Рестораны",
    "Аптека",
    "Почта",
    "Налоговая",
    "Миграционный центр",
    "Завод",
  ];

  const [showAllThemes, setShowAllThemes] = useState(false);
  const navigate = useNavigate();

  const shownThemes = showAllThemes ? popularThemes : popularThemes.slice(0, 5);
  const { setChosenTopic } = useTopicStore();

  const handleShowAll = () => {
    setShowAllThemes(true);
  };

  useEffect(() => {
    const server = async () => {
      try {
        const res = await getPopularThemes();
        console.log(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке популярных тем:", err);
      }
    };
    server();
  }, []);

  const handleThemeClick = (theme: string) => {
    setChosenTopic(theme);
    navigate("/chosen-topic");
  };
  return (
    <div className="themes-wrapper">
      <h3>Популярные темы перевода</h3>
      <div className="themes">
        {shownThemes.map((theme: string, index: number) => (
          <Theme key={index} theme={theme} onClick={handleThemeClick} />
        ))}
        {!showAllThemes && (
          <div className="theme-wrapper">
            <button type="button" className="theme" onClick={handleShowAll}>
              <img src="/assets/theme-icons/all.png" alt="theme-icon" />
              <h5>Остальные</h5>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
