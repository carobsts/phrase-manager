import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

import { Toaster } from "./components/ui/sonner";

import App from "./App";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
