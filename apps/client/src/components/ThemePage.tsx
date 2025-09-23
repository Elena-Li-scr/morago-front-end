import Theme from "@shared/components/Theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopicStore, useIdTopicStore, useTopicUrlStore } from "@shared/store/useStore";
import { getPopularThemes, getLastChoosenThemes } from "@shared/services/clientApi";

import "@shared/styles/homePage.css";
import "@shared/styles/theme.css";
type ThemeItem = {
  id: number;
  name: string;
  isActive: boolean;
  iconId: number | null;
  categoryId: number;
  isPopular: boolean;
  iconUrl: string;
};

export default function ThemePage() {
  const [popularThemes, setPopularThemes] = useState<ThemeItem[]>([]);
  const [lastThemes, setLastThemes] = useState<ThemeItem[]>([]);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showAllLastThemes, setShowAllLastThemes] = useState(false);
  const navigate = useNavigate();

  const shownThemes = showAllThemes ? popularThemes : popularThemes.slice(0, 5);
  const shownLastThemes = showAllLastThemes ? lastThemes : lastThemes.slice(0, 5);
  const { setChosenTopic } = useTopicStore();
  const { setChosenTopicId } = useIdTopicStore();
  const { setChosenTopicUrl } = useTopicUrlStore();

  const handleShowAll = () => {
    setShowAllThemes(true);
  };
  const handleShowAllLast = () => {
    setShowAllLastThemes(true);
  };

  useEffect(() => {
    const server = async () => {
      try {
        const res = await getPopularThemes();
        const last = await getLastChoosenThemes();
        setPopularThemes(res.data.content);
        setLastThemes(last.data.favoriteThemes);
      } catch (err) {
        console.error("Ошибка при загрузке популярных тем:", err);
      }
    };
    server();
  }, []);

  const handleThemeClick = (theme: ThemeItem) => {
    setChosenTopic(theme.name);
    setChosenTopicId(theme.id);
    setChosenTopicUrl(theme.iconUrl);
    navigate("/chosen-topic");
  };
  return (
    <div className="themes-wrapper">
      <h3>Популярные темы перевода</h3>
      <div className="themes">
        {shownThemes.map((theme) => (
          <Theme
            key={theme.id}
            theme={theme.name}
            iconUrl={theme.iconUrl}
            onClick={() => handleThemeClick(theme)}
          />
        ))}
        {!showAllThemes && popularThemes.length > 6 && (
          <div className="theme-wrapper">
            <button type="button" className="theme" onClick={handleShowAll}>
              <img src="/assets/theme-icons/all.png" alt="theme-icon" />
              <h5>Остальные</h5>
            </button>
          </div>
        )}
      </div>
      {lastThemes.length > 0 && (
        <div>
          <h3>Мои последние выбранные темы</h3>
          <div className="themes">
            {shownLastThemes.map((theme) => (
              <Theme
                key={theme.id}
                theme={theme.name}
                iconUrl={theme.iconUrl}
                onClick={() => handleThemeClick(theme)}
              />
            ))}
            {!showAllLastThemes && lastThemes.length > 6 && (
              <div className="theme-wrapper">
                <button type="button" className="theme" onClick={handleShowAllLast}>
                  <img src="/assets/theme-icons/all.png" alt="theme-icon" />
                  <h5>Остальные</h5>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
