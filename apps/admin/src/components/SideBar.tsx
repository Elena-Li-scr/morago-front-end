import SmallButton from "./SmallButton";
import "../assets/style/sideBar.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SideBar() {
  const [openList, setOpenList] = useState(false);
  const [openTopics, setOpenTopics] = useState(false);
  const [addType, setAddType] = useState<string>("");
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const { type } = useParams();

  const selectHandler = (text: string) => {
    setSelected(text);
    setAddType(text);
    navigate(`${text}`);
  };

  const addHandler = (text: string) => {
    if (type === "themes" || type === "categories") {
      navigate(`translationTopics/${type}/newPage?from=${type}`);
      // setAddType("");
    }
  };

  return (
    <div className="side-bar">
      <div className="side-bar-selectors">
        <div className="admin-list">
          <button type="button" onClick={() => setOpenList((prev) => !prev)}>
            <img src={openList ? "/assets/close.png" : "/assets/open.png"} alt="open-button" />
            Lists
          </button>
        </div>
        {openList && (
          <div className="admin-list-selectors">
            <button
              className={
                selected === "lists/user" ? "admin-selectors admin-selected" : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("lists/user")}
            >
              User
            </button>
            <button
              className={
                selected === "lists/translator"
                  ? "admin-selectors admin-selected"
                  : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("lists/translator")}
            >
              Translator
            </button>
          </div>
        )}
        <div className="admin-list top-line">
          <button type="button" onClick={() => setOpenTopics((prev) => !prev)}>
            <img src={openTopics ? "/assets/close.png" : "/assets/open.png"} alt="open-button" />
            Translation topics
          </button>
        </div>
        {openTopics && (
          <div className="admin-list-selectors">
            <button
              className={
                selected === "translationTopics/themes"
                  ? "admin-selectors admin-selected"
                  : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("translationTopics/themes")}
            >
              Themes
            </button>
            <button
              className={
                selected === "translationTopics/categories"
                  ? "admin-selectors admin-selected"
                  : "admin-selectors"
              }
              type="button"
              onClick={() => selectHandler("translationTopics/categories")}
            >
              Categories
            </button>
          </div>
        )}
      </div>
      <div className="side-bar-setting">
        <SmallButton text="Add" icon="/assets/add-icon.png" onClick={() => addHandler(addType)} />
        <button type="button" className="setting-button">
          <img src="/assets/setting.png" alt="settings" />
        </button>
      </div>
    </div>
  );
}
