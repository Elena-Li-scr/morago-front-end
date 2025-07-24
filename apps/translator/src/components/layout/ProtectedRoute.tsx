import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../utils/auth";

export default function ProtectedLayout() {
  const { pathname } = useLocation();

  // 1. Не авторизован
  if (!auth.isAuthenticated()) {
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
