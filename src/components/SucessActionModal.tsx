import MainButton from "./MainButton";
interface Props {
  header: string;
  text: string;
  btn: string;
}
export default function SucessActionModal({ header, text, btn }: Props) {
  return (
    <div className="code-success">
      <div className="code-cover">
        <div className="code-success-wrapper">
          <h3 className="code-success-header">{header}</h3>
          <p className="code-success-text">{text}</p>
          <MainButton type="button" text={btn} />
        </div>
      </div>
    </div>
  );
}
