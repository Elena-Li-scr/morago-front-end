// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../../shared/styles/index.css";
import App from "./App.tsx";
import { CallProvider } from "./components/call/CallContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CallProvider>
    <App />
  </CallProvider>
);
