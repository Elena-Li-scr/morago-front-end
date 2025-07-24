import "../assets/style/buttons.css";

interface Props {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}
export default function BigButton({ text, type, onClick }: Props) {
  return (
    <button type={type} className="big-button" onClick={onClick}>
      {text}
    </button>
  );
}
