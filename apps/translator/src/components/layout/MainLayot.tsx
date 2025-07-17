import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import "../../assets/style/nav.css";
import MainHeader from "./MainHeader";

export default function MainLayout() {
  return (
    <>
      <div className="layout">
        <MainHeader />
        <main className="main-translator">
          <Outlet />
        </main>
        <MainFooter />
      </div>
    </>
  );
}
