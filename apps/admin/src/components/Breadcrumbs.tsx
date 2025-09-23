import { useLocation, useNavigate } from "react-router-dom";
import { isListsTableType } from "../constans/tableConfigs/configs";

type Props = {
  from?: string;
};
export const Breadcrumbs = ({ from }: Props) => {
  const location = useLocation();
  const rawPathnames = location.pathname.split("/").filter(Boolean);
  const navigate = useNavigate();

  // Убираем id и "name" из пути
  const pathnames = rawPathnames.filter(
    (segment) => isNaN(Number(segment)) && !segment.toLowerCase().includes("name"),
  );

  const fullPathnames = [...pathnames];

  // Если ?from=user — добавляем в путь
  if (from && !fullPathnames.includes(from)) {
    const index = fullPathnames.findIndex((el) => isListsTableType(el));
    if (index !== -1) {
      fullPathnames.splice(index, 0, from);
    }
  }

  const nice = (s: string) =>
    s.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
  function formatCrumb(segment: string, index: number, segments: string[]) {
    if (segment === "newPage") {
      const prev = segments[index - 1];
      if (prev === "themes") return "Add Themes";
      if (prev === "categories") return "Add Categories";
    }
    return nice(segment);
  }
  return (
    <nav className="bread-crumbs">
      {fullPathnames.map((segment, index) => {
        const isLast = index === fullPathnames.length - 1;
        const label = formatCrumb(segment, index, fullPathnames);
        const shouldGoBack = from && label.toLowerCase() === from.toLowerCase();
        return (
          <span key={index}>
            {index !== 0 && " / "}
            {shouldGoBack ? (
              <button onClick={() => navigate(-1)} className="bread-crumbs-type">
                {label}
              </button>
            ) : (
              <span className={`bread-crumbs-type ${isLast ? "active" : ""}`}>{label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};
