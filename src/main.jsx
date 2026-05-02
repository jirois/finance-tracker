import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FinanceProvider } from "./context/FinanceContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </StrictMode>,
);
