import MainButton from "./MainButton";
interface Props {
  header: string;
  text?: string;
  btn: string;
  bgImg: string;
  onClick?: () => void;
  className: string;
}
export default function SucessActionModal({ header, text, btn, bgImg, onClick, className }: Props) {
  return (
    <div className="success">
      <div className="code-cover" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="success-wrapper">
          <h3 className="success-header">{header}</h3>
          <p className="success-text">{text}</p>
          <MainButton type="button" className={className} text={btn} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
