import type { Translator } from "../types";
import "@shared/styles/calls.css";
interface Props {
  translator: Translator;
  onClick?: () => void;
}
export default function TranslatorInfoSimple({ translator, onClick }: Props) {
  return (
    <div className="simple-call-detail" role="button" onClick={onClick}>
      <img
        src={
          translator.imageUrl
            ? `http://localhost:8080${translator.imageUrl}`
            : "/assets/profile/temporary-photo.png"
        }
        alt="translator-photo"
      />
      <div className="simple-call-main">
        <div>
          <p
            // className={
            //   translator.online
            //     ? "simple-call-name simple-call-name-online"
            //     : "simple-call-name simple-call-name-offline"
            // }
            className="simple-call-name simple-call-name-online"
          >
            {translator.name}
          </p>
          <p>{translator.theme}</p>
        </div>
        <div className="simple-call-time">
          <p>{translator.date}</p>
        </div>
      </div>
    </div>
  );
}
