import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
export default function StartPageLayout() {
  return (
    <div className="start-page">
      <MainHeader start />
      <Outlet />
    </div>
  );
}
