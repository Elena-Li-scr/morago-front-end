type ButtonType = "button" | "submit" | "reset";
interface Props {
  bgColor?: string;
  type: ButtonType;
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export default function MainButton({
  bgColor,
  type,
  text,
  onClick,
  className,
  disabled,
}: Props) {
  return (
    <button
      style={{ backgroundColor: bgColor }}
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
