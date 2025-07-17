import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import RegisterForm from "./pages/Register";
import VerificationCode from "./pages/Verification";
import NewTrasnlator from "./pages/NewTranslator";
import MainLayout from "./components/layout/MainLayot";
import Balance from "./pages/Balance";
import Home from "./pages/Home";
import Withdrawal from "./pages/Withdrawal";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ProfileLayout from "./components/layout/MyProfileLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verification" element={<VerificationCode />} />

        <Route path="/newTranslator" element={<NewTrasnlator />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/my-balance-translator-page" element={<Balance />} />
          <Route path="/my-home-translator-page" element={<Home />} />
          <Route path="my-profile-page" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="/withdrawal-page" element={<Withdrawal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
