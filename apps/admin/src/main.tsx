import { createRoot } from "react-dom/client";
import "../../../shared/styles/index.css";
import App from "./App";
import { PopUpProvider } from "./components/PopUp/PopUpProvider";

createRoot(document.getElementById("root")!).render(
  <PopUpProvider>
    <App />
  </PopUpProvider>,
);
