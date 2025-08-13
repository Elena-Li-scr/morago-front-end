import "../assets/style/buttons.css";

interface Props {
  icon?: string;
  text?: string;
  onClick: () => void;
}

export default function SmallButton({ icon, text, onClick }: Props) {
  return (
    <div className="small-button" onClick={onClick} role="button">
      <img src={icon} alt="icon" />
      <p>{text}</p>
    </div>
  );
}
