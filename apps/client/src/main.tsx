import { createRoot } from "react-dom/client";
import "../../../shared/styles/index.css";
import App from "./App";
import { CallProvider } from "./lib/CallProvider";

const token = localStorage.getItem("token") || "";

createRoot(document.getElementById("root")!).render(
  <CallProvider role={"USER"} wsUrl="http://localhost:8080/ws" token={token}>
    <App />
  </CallProvider>,
);
