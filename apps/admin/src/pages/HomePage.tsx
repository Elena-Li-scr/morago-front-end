import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

import "../assets/style/pages.css";
export default function HomePage() {
  return (
    <div className="admin-home-page">
      <SideBar />
      <Outlet />
    </div>
  );
}
