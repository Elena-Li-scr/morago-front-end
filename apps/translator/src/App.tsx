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
import LogIn from "./pages/LogIn";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ChangeDataTranslator from "./pages/ChangeDataTranslator";
import ProfileSubLayout from "./components/layout/ProfileSubLayout";
import CallHistory from "./pages/CallHistory";
import { IncomingCallModal } from "./components/call/IncomingCallModal";
import { CallModal } from "./components/call/CallModal";
import Loader from "@shared/components/Loader";
import NotificationTranslator from "./pages/NotificationTranslator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verification/:process/:phone" element={<VerificationCode />} />
        <Route path="/new-translator/:phone" element={<NewTrasnlator />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/my-home-translator-page" element={<Home />} />
            <Route path="/my-balance-translator-page" element={<Balance />} />
            <Route path="/my-call-history" element={<CallHistory />} />
          </Route>
          <Route path="/my-profile-page" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/my-profile-page" element={<ProfileSubLayout />}>
            <Route path="change-data" element={<ChangeDataTranslator />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/withdrawal-page" element={<Withdrawal />} />
          <Route path="/my-notification-page" element={<NotificationTranslator />} />
        </Route>
      </Routes>
      <Loader />
      <IncomingCallModal />
      <CallModal />
    </BrowserRouter>
  );
}

export default App;
