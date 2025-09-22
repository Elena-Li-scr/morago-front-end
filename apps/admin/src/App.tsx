import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPageLayout from "./components/StartPageLayout";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import HomePage from "./pages/HomePage";
import GenericTablePage from "./pages/GenericTablePage";
import AddPage from "./components/AddPage";
import PopUp from "./components/PopUp/PopUp";

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
              <Route path="lists/:type/:request" element={<AddPage />} />
              <Route
                path="translationTopics/:type"
                element={<GenericTablePage section="topics" />}
              />
              <Route
                path="translationTopics/:type/:id"
                element={<GenericTablePage section="topics" />}
              />
              <Route path="translationTopics/:type/newPage" element={<AddPage />} />
              <Route path="translationTopics/:type/:id/upDate" element={<AddPage />} />
            </Route>
          </Route>
        </Routes>
        <PopUp />
      </BrowserRouter>
    </>
  );
}

export default App;
