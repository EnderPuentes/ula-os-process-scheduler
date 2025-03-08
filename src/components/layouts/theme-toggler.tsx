"use client";

import { MoonIcon, SunDimIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-background cursor-pointer"
    >
      {resolvedTheme === "light" ? (
        <MoonIcon className="w-4 h-4" />
      ) : (
        <SunDimIcon className="w-6 h-6" />
      )}
    </button>
  );
}
