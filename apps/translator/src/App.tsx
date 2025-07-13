import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import RegisterForm from "./pages/Register";
import VerificationCode from "./pages/Verification";
import NewTrasnlator from "./pages/NewTranslator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verification" element={<VerificationCode />} />
        <Route path="/newTranslator" element={<NewTrasnlator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
