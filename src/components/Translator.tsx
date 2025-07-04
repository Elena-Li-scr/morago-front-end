import Rating from "./Rating";
import "../styles/translator.css";
interface Props {
  name: string;
  theme: string;
  rating: number;
  reviewsCount: number;
  photo: string;
  time?: string;
  onClick?: () => void;
}

export default function Translator({
  photo,
  name,
  rating,
  theme,
  time,
  reviewsCount,
  onClick,
}: Props) {
  return (
    <div className="translator" role="button" onClick={onClick}>
      <img src={photo} alt="photo" />
      <div>
        <div className="translator-main-info">
          <p>{name}</p>
          <Rating count={rating} />
          <span>({reviewsCount})</span>
        </div>
        <p className="translator-theme">{theme}</p>
      </div>
      <div className="translator-call-time">{time}</div>
    </div>
  );
}
