"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = stored || "light";
    setThemeState(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const setTheme = (mode: "light" | "dark") => {
    localStorage.setItem("theme", mode);
    setThemeState(mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return { theme, setTheme, toggleTheme };
}
