import Rating from "./Rating";
import "@shared/styles/translator.css";
import type { Translator } from "../types";

interface Props {
  translator: Translator;
  onClick?: () => void;
  uploads?: boolean;
}

export default function TranslatorInfo({ translator, onClick, uploads = false }: Props) {
  function formatDate(dateString: string) {
    const [, month, day] = dateString.split(" ")[0].split(".");
    return `${month}.${day}`;
  }
  return (
    <div className="translator" role="button" onClick={onClick}>
      <img
        src={
          translator.imageUrl
            ? uploads
              ? `http://localhost:8080/uploads/${translator.imageUrl}`
              : `http://localhost:8080${translator.imageUrl}`
            : "/assets/profile/temporary-photo.png"
        }
        className="translator-avatar"
        alt="photo"
      />
      <div>
        <div className="translator-main-info">
          <p>{translator.name ? translator.name : translator.nameWithInitials}</p>
          <Rating count={translator.rating || 0} />
          <span>({translator.reviewsCount || 0})</span>
        </div>
        <p className="translator-theme">{translator.theme}</p>
      </div>
      {translator.date && <div className="translator-call-time">{formatDate(translator.date)}</div>}
    </div>
  );
}
