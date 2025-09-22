import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPageLayout from "./components/StartPageLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GenericTablePage from "./pages/GenericTablePage";
import AddPage from "./components/AddPage";
import PopUp from "./components/PopUp/PopUp";
import Loader from "@shared/components/Loader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPageLayout />}>
            <Route index element={<LoginPage />} />
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
        <Loader />
        <PopUp />
      </BrowserRouter>
    </>
  );
}

export default App;
