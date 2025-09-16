import { navItems } from "../../constans/constans";
import { useNavigate, useLocation } from "react-router-dom";

export default function MainFooter() {
  const navigate = useNavigate();
  const toHomePage = () => navigate("/my-home-translator-page");
  const toCallHistoryPage = () => navigate("/my-call-history");
  const toProfilePage = () => navigate("/my-profile-page");
  const location = useLocation();
  const page = location.pathname.toLowerCase();
  const isProfilePage = location.pathname.toLowerCase() === "/my-profile-page/change-password";

  const navWithHandlers = navItems.map((item) => ({
    ...item,
    onClick:
      item.name === "main" ? toHomePage : item.name === "phone" ? toCallHistoryPage : toProfilePage,
  }));

  if (!isProfilePage)
    return (
      <footer className="main-footer-tranlator main-footer">
        <div className="main-footer-container">
          {navWithHandlers.map((item) => (
            <button
              key={item.name}
              type="button"
              className="main-footer-button"
              onClick={item.onClick}
            >
              <div
                className={`${page === item.route ? " main-footer-nav active" : "main-footer-nav"}`}
              >
                {item.icon}
              </div>
              <h3 className={`main-footer-icon ${page === item.route ? "main-footer-active" : ""}`}>
                {item.label}
              </h3>
            </button>
          ))}
        </div>
      </footer>
    );
}
