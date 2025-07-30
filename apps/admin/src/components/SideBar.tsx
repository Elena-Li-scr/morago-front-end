import SmallButton from "./SmallButton";
import "../assets/style/sideBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [openList, setOpenList] = useState(false);
  const [openTopics, setOpenTopics] = useState(false);

  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const selectHandler = (text: string) => {
    setSelected(text);
    navigate(`/home/${text}`);
  };

  return (
    <div className="side-bar">
      <div className="side-bar-selectors">
        <div className="admin-list">
          <button type="button" onClick={() => setOpenList((prev) => !prev)}>
            <img src={openList ? "/assets/close.png" : "/assets/open.png"} alt="open-button" />
          </button>
          <h3>Lists</h3>
        </div>
        {openList && (
          <div className="admin-list-selectors">
            <button
              className={selected === "user" ? "admin-selectors admin-selected" : "admin-selectors"}
              type="button"
              onClick={() => selectHandler("user")}
            >
              User
            </button>
            <button
              className={
                selected === "translator" ? "admin-selectors admin-selected" : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("translator")}
            >
              Translator
            </button>
          </div>
        )}
        <div className="admin-list top-line">
          <button type="button" onClick={() => setOpenTopics((prev) => !prev)}>
            <img src={openTopics ? "/assets/close.png" : "/assets/open.png"} alt="open-button" />
          </button>
          <h3>Translation topics</h3>
        </div>
        {openTopics && (
          <div className="admin-list-selectors">
            <button
              className={
                selected === "themes" ? "admin-selectors admin-selected" : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("themes")}
            >
              Themes
            </button>
            <button
              className={
                selected === "categories" ? "admin-selectors admin-selected" : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("categories")}
            >
              Categories
            </button>
          </div>
        )}
      </div>
      <div className="side-bar-setting">
        <SmallButton text="Add" icon="/assets/add-icon.png" />
        <button type="button" className="setting-button">
          <img src="/assets/setting.png" alt="settings" />
        </button>
      </div>
    </div>
  );
}
