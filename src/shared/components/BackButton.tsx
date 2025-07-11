import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const backHandle = () => {
    navigate(-1);
  };
  return (
    <button type="button" onClick={backHandle} className="back-button">
      <img src="/assets/arrow-left.png" alt="arrow" />
    </button>
  );
}
