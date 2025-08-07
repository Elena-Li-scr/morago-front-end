import { useState } from "react";
import "../../assets/style/statusToggle.css";
import { switchTranslatorStatus } from "../../api/services/services";

export const StatusToggle = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  const switchStatusHandler = () => {
    if (isAvailable) setIsAvailable(false);
    if (!isAvailable) setIsAvailable(true);
    switchTranslatorStatus();
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
