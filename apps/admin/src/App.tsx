import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPageLayout from "./components/StartPageLayout";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import HomePage from "./pages/HomePage";
import User from "./pages/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPageLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="new-password" element={<NewPassword />} />
            <Route path="/home" element={<HomePage />}>
              <Route path="user" element={<User />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
