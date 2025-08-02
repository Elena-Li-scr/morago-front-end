import "../assets/style/buttons.css";

interface Props {
  icon?: string;
  text?: string;
}

export default function SmallButton({ icon, text }: Props) {
  return (
    <div className="small-button">
      <img src={icon} alt="icon" />
      <p>{text}</p>
    </div>
  );
}
