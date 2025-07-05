import BalanceHeader from "../components/BalanceHeader";
import HomeFooter from "../components/HomeFooter";
export default function UpBalance() {
  return (
    <div className="up-balance-wrapper">
      <BalanceHeader />
      <HomeFooter page="main" />
    </div>
  );
}
