import { navItems } from "../../constans/constans";
import { useNavigate } from "react-router-dom";

export default function MainFooter() {
  const navigate = useNavigate();
  const toHomePage = () => navigate("/my-home-translator-page");
  const toPhonePage = () => navigate("/my-home-translator-page");
  const toMessagesPage = () => navigate("/my-home-translator-page");
  const toProfilePage = () => navigate("/my-profile-page");

  const page = location.pathname.toLowerCase();
  const isProfilePage =
    location.pathname.toLowerCase() === "/my-profile-page/change-password";

  const navWithHandlers = navItems.map((item) => ({
    ...item,
    onClick:
      item.name === "main"
        ? toHomePage
        : item.name === "phone"
        ? toPhonePage
        : item.name === "message"
        ? toMessagesPage
        : toProfilePage,
  }));
  if (!isProfilePage)
    return (
      <footer className="main-footer-tranlator main-footer">
        {navWithHandlers.map((item) => (
          <button key={item.name} type="button" onClick={item.onClick}>
            <img
              src={page === item.route ? item.iconActive : item.icon}
              alt={item.name}
            />
            <h3
              className={`main-footer-icon ${
                page === item.route ? "main-footer-active" : ""
              }`}
            >
              {item.label}
            </h3>
          </button>
        ))}
      </footer>
    );
}
