import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem("darkMode");
    const isDark = saved ? JSON.parse(saved) : false;
    
    // Apply immediately on initial load
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    
    return isDark;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
