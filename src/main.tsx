import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);