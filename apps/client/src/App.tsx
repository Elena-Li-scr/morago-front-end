import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import CodeInput from "./pages/CodeInput";
import HomePage from "./pages/HomePage";
import CallSelectors from "./pages/CallSelectors";
import ChosenTopicPage from "./pages/ChosenTopicPage";
import UpBalance from "./pages/UpBalance";
import BalanceWithdraw from "./pages/BalanceWithdraw";
import Profile from "./pages/Profile";
import ChangeProfile from "./pages/ChangeProfile";
import ChangePassword from "./pages/ChangePassword";
import CallPage from "./pages/CallPage";
import CallsHistory from "./pages/CallsHistory";
import Notification from "./pages/Notification";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-up" />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/code" element={<CodeInput />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/call-selectors" element={<CallSelectors />} />
          <Route path="/chosen-topic" element={<ChosenTopicPage />} />
          <Route path="/up-balance" element={<UpBalance />} />
          <Route path="/balance-withdraw" element={<BalanceWithdraw />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-profile" element={<ChangeProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/calls-history" element={<CallsHistory />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
