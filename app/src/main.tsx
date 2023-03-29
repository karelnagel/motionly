import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { Home } from "./screens/Home";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <Home />
  </React.StrictMode>
);
