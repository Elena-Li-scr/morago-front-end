import { useState } from "react";
import "../../assets/style/statusToggle.css";

export const StatusToggle = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="toggle-background">
      <div className={`toggle-slider ${isAvailable ? "left" : "right"}`}></div>

      <button
        className={`toggle-option ${isAvailable ? "active" : ""}`}
        onClick={() => setIsAvailable(true)}
      >
        Доступен
      </button>
      <button
        className={`toggle-option ${!isAvailable ? "active red" : ""}`}
        onClick={() => setIsAvailable(false)}
      >
        Не доступен
      </button>
    </div>
  );
};
