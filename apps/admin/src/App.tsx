import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPageLayout from "./components/StartPageLayout";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import HomePage from "./pages/HomePage";
import GenericTablePage from "./pages/GenericTablePage";

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
              <Route path="lists/:type" element={<GenericTablePage section="lists" />} />
              <Route path="lists/:type/:id" element={<GenericTablePage section="lists" />} />
              <Route
                path="translationTopics/:type"
                element={<GenericTablePage section="topics" />}
              />
              <Route
                path="translationTopics/:type/:id"
                element={<GenericTablePage section="topics" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
