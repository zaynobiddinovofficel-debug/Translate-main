import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [currentFont, setCurrentFont] = useState(localStorage.getItem("font_family") || "sans");

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.classList.remove("font-serif", "font-sans", "font-mono");
    document.documentElement.classList.add(
      currentFont === "serif" ? "font-serif" :
      currentFont === "sans" ? "font-sans" : "font-mono"
    );
    localStorage.setItem("font_family", currentFont);
  }, [currentFont]);

  return (
    <header className="flex justify-center items-center border-b border-gray-300 dark:border-gray-600">
      <div className="flex w-full justify-between items-center max-w-[735px] p-6">
        <a href="/">
          <img src="/imgs/logo.svg" className="h-10 w-10" alt="logo"/>
        </a>

        <div className="flex items-center gap-4">
          {/* FONT SELECT */}
          <select
            value={currentFont}
            onChange={(e) => setCurrentFont(e.target.value)}
            className="border rounded px-2 py-1 bg-white dark:bg-[#2A2A2A] text-black dark:text-white"
          >
            <option value="sans">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Mono</option>
          </select>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}