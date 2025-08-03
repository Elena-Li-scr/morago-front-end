import { useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="bread-crumbs">
      {pathnames.map((segment, index) => {
        const path = "/" + pathnames.slice(0, index + 1).join("/");
        const isActive = location.pathname === path;
        return (
          <span key={index}>
            {index !== 0 && " / "}
            <span className={`bread-crumbs-type ${isActive ? "active" : ""}`}>
              {capitalize(segment)}
            </span>
          </span>
        );
      })}
    </nav>
  );
};
