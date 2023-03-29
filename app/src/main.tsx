import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { pages } from "./pages";
import { useStore } from "./store";
import "./styles.css";

const App = () => {
  const page = useStore((s) => s.page);
  const Page = pages[page];
  return (
    <>
      <Toaster position="top-center" />
      <Page />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
