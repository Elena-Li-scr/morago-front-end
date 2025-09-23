import "../assets/style/buttons.css";

interface Props {
  icon?: string;
  text?: string;
  from?: string;
  onClick: () => void;
}

export default function SmallButton({ from, icon, text, onClick }: Props) {
  return (
    <button className="small-button" disabled={from ? true : false} onClick={onClick} role="button">
      <img src={icon} alt="icon" />
      <p>{text}</p>
    </button>
  );
}
