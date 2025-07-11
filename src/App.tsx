import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./apps/client/SignUp";
import CodeInput from "./apps/client/CodeInput";
import HomePage from "./apps/client/HomePage";
import CallSelectors from "./apps/client/CallSelectors";
import ChosenTopicPage from "./apps/client//ChosenTopicPage";
import UpBalance from "./apps/client//UpBalance";
import BalanceWithdraw from "./apps/client//BalanceWithdraw";
import Profile from "./apps/client//Profile";
import ChangeProfile from "./apps/client//ChangeProfile";
import ChangePassword from "./apps/client//ChangePassword";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
