"use client";

import { ReactNode, useEffect, useState } from "react";
type Theme = "dark" | "light";

export const Theme = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(theme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });
  }, []);

  return (
    <html lang="en" className="min-h-screen bg-base-100 text-base-content" data-theme={theme}>
      {children}
    </html>
  );
};
