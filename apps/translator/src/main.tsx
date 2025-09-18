// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../../shared/styles/index.css";
import App from "./App.tsx";
import { CallProvider } from "@shared/components/webRtc/CallProvider.tsx";

const token = localStorage.getItem("token") || "";
createRoot(document.getElementById("root")!).render(
  <CallProvider role={"TRANSLATOR"} wsUrl="http://localhost:8080/ws" token={token}>
    <App />
  </CallProvider>,
);
