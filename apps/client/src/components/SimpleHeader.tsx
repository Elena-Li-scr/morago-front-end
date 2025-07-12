import "@shared/styles/simpleHeader.css";
interface Props {
  onClick: () => void;
}
export default function SimpleHeader({ onClick }: Props) {
  return (
    <div className="simple-header">
      <button type="button" className="back-button-simple" onClick={onClick}>
        <img src="/assets/home/white-arrow-left.png" alt="back-arrow" />
      </button>
      <h2>
        <img src="/assets/home/morago.png" alt="morago" />
      </h2>
    </div>
  );
}
