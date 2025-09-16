import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopicStore, useIdTopicStore } from "@shared/store/useStore";
import SimpleHeader from "../components/SimpleHeader";
import MainFooter from "../components/MainFooter";
import Theme from "@shared/components/Theme";
import MainButton from "@shared/components/MainButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getCategories, getThemesByCategory } from "@shared/services/clientApi";

import "@shared/styles/homePage.css";

type Category = {
  id: number;
  name: string;
  isActive: boolean;
};

type CategoriesResponse = {
  content: Category[];
};

type ThemeItem = {
  id: number;
  name: string;
  isActive: boolean;
  iconId: number;
  categoryId: number;
  isPopular: boolean;
};

type ThemesResponse = {
  content: ThemeItem[];
};

export default function CallSelectors() {
  const navigate = useNavigate();
  const { chosenTopic, setChosenTopic } = useTopicStore();
  const { setChosenTopicId } = useIdTopicStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [themesByCategory, setThemesByCategory] = useState<Record<number, ThemeItem[]>>({});
  const [loadingThemes, setLoadingThemes] = useState<Record<number, boolean>>({});
  const [openedGroups, setOpenedGroups] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await getCategories();
        const payload: CategoriesResponse = res.data;
        const active = (payload.content || []).filter((c) => c.isActive !== false);
        if (!ignore) setCategories(active);
      } catch (e) {
        console.error("getCategories error:", e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const fetchThemesOnce = async (categoryId: number) => {
    if (themesByCategory[categoryId] || loadingThemes[categoryId]) return;

    setLoadingThemes((prev) => ({ ...prev, [categoryId]: true }));
    try {
      const res = await getThemesByCategory({ id: categoryId });
      const payload: ThemesResponse = res.data;
      const active = (payload.content || []).filter((t) => t.isActive !== false);
      setThemesByCategory((prev) => ({ ...prev, [categoryId]: active }));
    } catch (e) {
      console.error(`getThemesByCategory(${categoryId}) error:`, e);
      setThemesByCategory((prev) => ({ ...prev, [categoryId]: [] }));
    } finally {
      setLoadingThemes((prev) => ({ ...prev, [categoryId]: false }));
    }
  };

  const groupSelectorsToggle = (categoryId: number) => {
    setOpenedGroups((prev) => {
      const nextOpen = !prev[categoryId];
      if (nextOpen) fetchThemesOnce(categoryId);
      return { ...prev, [categoryId]: nextOpen };
    });
  };

  const handleThemeClick = (id: number, name: string) => {
    setChosenTopic(name);
    setChosenTopicId(id);
  };

  const handleBack = () => navigate(-1);
  const handleNext = () => {
    if (chosenTopic) navigate("/chosen-topic");
  };

  const getFilteredThemes = (themes: ThemeItem[]) =>
    themes.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (!searchTerm.trim()) return;

    categories.forEach((c) => fetchThemesOnce(c.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categories.length]);

  return (
    <div className="page-wrapper">
      <SimpleHeader onClick={handleBack} />
      <div className="scroll-content">
        <div className="call-selectors-main">
          <div className="selectors-search">
            <img src="/assets/home/search.png" alt="search" />
            <input
              type="text"
              placeholder="Поиск темы"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="selectors-search-input"
            />{" "}
          </div>

          {categories.map((cat) => {
            const themes = themesByCategory[cat.id] || [];
            const filteredThemes = searchTerm ? getFilteredThemes(themes) : themes;

            const isGroupOpen =
              searchTerm.length > 0 ? filteredThemes.length > 0 : !!openedGroups[cat.id];

            return (
              <div key={cat.id} className="call-selectors">
                <div
                  className="call-selectors-group-name"
                  onClick={() => groupSelectorsToggle(cat.id)}
                >
                  <h3>{cat.name}</h3>
                  <button type="button">
                    {isGroupOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </button>
                </div>

                {isGroupOpen && !loadingThemes[cat.id] && (
                  <div className="themes">
                    {(searchTerm ? filteredThemes : themes).map((theme) => (
                      <Theme
                        key={theme.id}
                        theme={theme.name}
                        onClick={(nameFromChild: string) =>
                          handleThemeClick(theme.id, nameFromChild)
                        }
                        style={chosenTopic === theme.name ? { backgroundColor: "#EB9412" } : {}}
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
      </div>

      <MainFooter page="main" />
    </div>
  );
}
