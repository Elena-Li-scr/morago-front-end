import { Outlet } from "react-router-dom";
import ProfileHeader from "../headers_footers/ProfileHeader";
import MainFooter from "../headers_footers/MainFooter";

export default function ProfileLayout() {
  return (
    <div className="profile-layout-wrapper">
      <ProfileHeader />
      <main className="main-translator">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
}
