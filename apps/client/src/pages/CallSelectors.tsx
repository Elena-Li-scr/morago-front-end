import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopicStore } from "@shared/store/useStore";
import { servicesGroup } from "@shared/utils/temporaryVar";
import SimpleHeader from "../components/SimpleHeader";
import MainFooter from "../components/MainFooter";
import Theme from "@shared/components/Theme";
import MainButton from "@shared/components/MainButton";

import "@shared/styles/homePage.css";

export default function CallSelectors() {
  const [openedGroups, setOpenedGroups] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const { chosenTopic, setChosenTopic } = useTopicStore();
  const navigate = useNavigate();

  const groupSelectorsToggle = (groupName: string) => {
    setOpenedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const handleThemeClick = (theme: string) => {
    setChosenTopic(theme);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (chosenTopic) navigate("/chosen-topic");
  };

  const getFilteredThemes = (themes: readonly string[]) =>
    themes.filter((theme) =>
      theme.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="call-selectors-wrapper">
      <SimpleHeader onClick={handleBack} />
      <div className="call-selectors-main">
        <div className="selectors-search">
          <img src="/assets/home/search.png" alt="search" />
          <input
            type="text"
            placeholder="Поиск темы"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="selectors-search-input"
          />
        </div>

        {Object.entries(servicesGroup).map(([groupName, themes]) => {
          const filteredThemes = getFilteredThemes(themes);
          const isGroupOpen =
            searchTerm.length > 0
              ? filteredThemes.length > 0
              : openedGroups[groupName];

          return (
            <div key={groupName} className="call-selectors">
              <div className="call-selectors-group-name">
                <h3>{groupName}</h3>
                <button
                  type="button"
                  onClick={() => groupSelectorsToggle(groupName)}
                >
                  {isGroupOpen ? (
                    <img
                      src="/assets/close.PNG"
                      alt="to-open"
                      className="close-group"
                    />
                  ) : (
                    <img
                      src="/assets/open.PNG"
                      alt="to-open"
                      className="open-group"
                    />
                  )}
                </button>
              </div>
              {isGroupOpen && (
                <div className="themes">
                  {(searchTerm ? filteredThemes : themes).map((theme) => (
                    <Theme
                      key={theme}
                      theme={theme}
                      onClick={handleThemeClick}
                      style={
                        chosenTopic === theme
                          ? { backgroundColor: "#EB9412" }
                          : {}
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="call-main-button">
        <MainButton
          text="Далее"
          type="button"
          onClick={handleNext}
          disabled={!chosenTopic}
          className="button button-active"
        />
      </div>
      <MainFooter page="main" />
    </div>
  );
}
