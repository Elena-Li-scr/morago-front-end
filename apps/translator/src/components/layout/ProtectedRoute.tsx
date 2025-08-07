import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../utils/auth";

export default function ProtectedLayout() {
  const { pathname } = useLocation();
  const token = auth.isAuthenticated();
  const decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  // 1. Не авторизован
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const payload = decodeToken(token);

  if (!payload || payload.exp * 1000 < Date.now()) {
    return <Navigate to="/login" replace />;
  }
  // 2. Код не подтверждён
  if (!auth.isVerified() && !pathname.startsWith("/verification")) {
    return <Navigate to="/verification/register/01000000000" replace />;
  }
  // 3. Профиль не заполнен
  if (!auth.isProfileFilled() && pathname !== "/new-translator") {
    return <Navigate to="/new-translator" replace />;
  }

  // Всё хорошо — рендерим вложенные маршруты
  return <Outlet />;
}
