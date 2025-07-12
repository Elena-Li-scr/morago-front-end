import Rating from "./Rating";
import "@shared/styles/translator.css";
interface Translator {
  name: string;
  theme: string;
  rating: number;
  reviewsCount: number;
  photo: string;
  time?: string;
}

interface Props {
  translator: Translator;
  onClick?: () => void;
}

export default function Translator({ translator, onClick }: Props) {
  return (
    <div className="translator" role="button" onClick={onClick}>
      <img src={translator.photo} alt="photo" />
      <div>
        <div className="translator-main-info">
          <p>{translator.name}</p>
          <Rating count={translator.rating} />
          <span>({translator.reviewsCount})</span>
        </div>
        <p className="translator-theme">{translator.theme}</p>
      </div>
      <div className="translator-call-time">{translator.time}</div>
    </div>
  );
}
