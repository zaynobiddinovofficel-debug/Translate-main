import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

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
    <header className="flex justify-between items-center p-6 max-w-[735px] mx-auto">
      <a href="/">
        <img src="/Logo.svg" className="h-8 w-8" alt="Logo" />
      </a>

      <div className="flex items-center gap-4">
        <select
          value={currentFont}
          onChange={(e) => setCurrentFont(e.target.value)}
          className="border px-2 py-1 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="sans">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="mono">Mono</option>
        </select>

        <button
          onClick={() => setIsDark(!isDark)}
          className={`relative w-12 h-6 rounded-full transition-colors
            ${isDark ? "bg-purple-600" : "bg-gray-300"} flex items-center`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
              ${isDark ? "translate-x-6" : "translate-x-0"}`}
          />
          {!isDark && (
            <span className="absolute left-1 top-0.5">
              <Moon size={16} className="text-gray-600" />
            </span>
          )}
          {isDark && (
            <span className="absolute right-1 top-0.5">
              <Sun size={16} className="text-yellow-400" />
            </span>
          )}
        </button>
      </div>
    </header>
  );
}