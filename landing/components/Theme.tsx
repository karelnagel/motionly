"use client";

import { ReactNode, useEffect, useState } from "react";

export const Theme = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(theme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });
  }, []);
  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme={theme}>
      {children}
    </div>
  );
};
