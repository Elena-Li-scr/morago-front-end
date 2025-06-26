import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import CodeInput from "./pages/CodeInput";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-up" />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/code" element={<CodeInput />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
