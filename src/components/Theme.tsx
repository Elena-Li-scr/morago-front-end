import "../styles/theme.css";
import { iconMap } from "../utils/temporaryVar";
import { useTopicStore } from "../store/useTopicStore";

interface ThemeProps {
  theme: string;
  onClick?: (theme: string) => void;
  style?: React.CSSProperties;
}

export default function Theme({ theme, onClick, style }: ThemeProps) {
  const { chosenTopic } = useTopicStore();
  const iconSrc = `/assets/theme-icons/${iconMap[theme]}`;
  return (
    <div className="theme-wrapper">
      <button
        className={chosenTopic ? "theme chosen-theme" : "theme"}
        onClick={() => onClick?.(theme)}
        style={style}
      >
        <img src={iconSrc} alt="theme-icon" />
        <h5>{theme}</h5>
      </button>
      {!chosenTopic && (
        <button type="button" className="theme-info">
          &#128712;
        </button>
      )}
    </div>
  );
}
