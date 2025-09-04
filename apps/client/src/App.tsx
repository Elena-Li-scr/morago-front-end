import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordCode from "./pages/ForgotPasswordCode";
import NewPassword from "./pages/NewPassword";
import GreetingPage from "./pages/GreetingPage";
import SignIn from "./pages/SignIn";
import Loader from "./components/Loader";
// import NotificationsListener from "./components/NotificationsListener";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GreetingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-code" element={<ForgotPasswordCode />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
        <Loader />
        {/* <NotificationsListener /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
