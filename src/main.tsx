import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/global.css";
import AppLayout from "./layouts/applayout/AppLayouts";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// 2. Рендерим приложение
root.render(
  <StrictMode>
    <AppLayout />
  </StrictMode>,
);
