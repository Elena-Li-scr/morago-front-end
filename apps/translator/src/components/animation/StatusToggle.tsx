import { useState } from "react";
import "../../assets/style/statusToggle.css";
import { switchTranslatorStatus } from "@shared/services/translatorApi";

export const StatusToggle = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  const switchStatusHandler = async () => {
    if (isAvailable) setIsAvailable(false);
    if (!isAvailable) setIsAvailable(true);
    await switchTranslatorStatus();
  };

  return (
    <div className="toggle-background">
      <div className={`toggle-slider ${isAvailable ? "left" : "right"}`}></div>

      <button
        className={`toggle-option ${isAvailable ? "active" : ""}`}
        onClick={switchStatusHandler}
      >
        Доступен
      </button>
      <button
        className={`toggle-option ${!isAvailable ? "active" : ""}`}
        onClick={switchStatusHandler}
      >
        Не доступен
      </button>
    </div>
  );
};
