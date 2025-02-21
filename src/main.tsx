import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
<ThemeProvider>
<BrowserRouter>
      <App />
    </BrowserRouter>
</ThemeProvider>
  </React.StrictMode>
);
