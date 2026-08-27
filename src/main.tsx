import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";

import "./index.css";
import AppStartup from "./pages/AppStartup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <AppStartup>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppStartup>
    </UserProvider>
  </StrictMode>
);