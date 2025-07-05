import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import CodeInput from "./pages/CodeInput";
import HomePage from "./pages/HomePage";
import CallSelectors from "./pages/CallSelectors";
import ChosenTopicPage from "./pages/ChosenTopicPage";
import UpBalance from "./pages/UpBalance";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
