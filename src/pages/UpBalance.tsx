import BalanceHeader from "../components/BalanceHeader";
import MainFooter from "../components/MainFooter";
import { translators } from "../utils/temporaryVar";
export default function UpBalance() {
  return (
    <div className="up-balance-wrapper">
      <BalanceHeader />
      <div className="detailing">
        <h3>Детализация</h3>
        <div className="prev-calling-list">
          {translators.map((translator) => (
            <div className="prev-call-detail">
              <img src={translator.photo} alt="translator-photo" />
              <div className="prev-call-main">
                <p>{translator.name}</p>
                <div className="prev-call-theme-time">
                  <p>{translator.theme}</p>
                  <div className="prev-call-time">{translator.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MainFooter page="main" />
    </div>
  );
}
