import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/Web-App-Outfitly/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
