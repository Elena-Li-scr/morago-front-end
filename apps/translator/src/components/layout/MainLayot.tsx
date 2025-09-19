import { Outlet } from "react-router-dom";
import MainFooter from "../headers_footers/MainFooter";
import "../../assets/style/nav.css";
import BalanceHeader from "../headers_footers/BalanceHeader";
import { IncomingCallModal } from "../call/IncomingCallModal";
import { CallModal } from "../call/CallModal";

export default function MainLayout() {
  return (
    <div className="layout">
      <BalanceHeader />
      <main className="main-translator">
        <Outlet />
      </main>
      <IncomingCallModal />
      <CallModal />
      <MainFooter />
    </div>
  );
}
