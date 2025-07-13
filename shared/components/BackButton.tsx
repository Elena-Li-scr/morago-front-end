import { useNavigate } from "react-router-dom";

interface Props {
  icon: string;
}
export default function BackButton({ icon }: Props) {
  const navigate = useNavigate();
  const backHandle = () => {
    navigate(-1);
  };
  return (
    <button type="button" onClick={backHandle} className="back-button">
      <img src={icon} alt="arrow" />
    </button>
  );
}
