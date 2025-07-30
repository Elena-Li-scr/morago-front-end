import { Outlet } from "react-router-dom";
import MainFooter from "../headers_footers/MainFooter";
import "../../assets/style/nav.css";
import BalanceHeader from "../headers_footers/BalanceHeader";

export default function MainLayout() {
  return (
    <div className="layout">
      <BalanceHeader />
      <main className="main-translator">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
}
