import type { Translator } from "../types";
import "@shared/styles/calls.css";
interface Props {
  translator: Translator;
  onClick: () => void;
}
export default function TranslatorInfoSimple({ translator, onClick }: Props) {
  return (
    <div className="simple-call-detail" role="button" onClick={onClick}>
      <img src={translator.photo} alt="translator-photo" />
      <div className="simple-call-main">
        <div>
          <p
            className={
              translator.online
                ? "simple-call-name simple-call-name-online"
                : "simple-call-name simple-call-name-offline"
            }
          >
            {translator.name}
          </p>
          <p>{translator.theme}</p>
        </div>
        <div className="simple-call-time">
          <p>{translator.date}</p>
          <p>{translator.time}</p>
        </div>
      </div>
    </div>
  );
}
