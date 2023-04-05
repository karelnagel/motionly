import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { pages } from "./pages";
import { useTemplateStore } from "./store";
import "./styles.css";

export const App = () => {
  const page = useTemplateStore((s) => s.page);
  const Page = pages[page];
  const theme = useTheme();
  return (
    <div className="text-base-content bg-base-100 h-screen" data-theme={theme}>
      <Toaster position="top-center" />
      <Page />
    </div>
  );
};

export const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">();
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(theme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });
  }, []);
  return theme;
};
