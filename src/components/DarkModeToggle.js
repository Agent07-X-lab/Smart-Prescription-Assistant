import React, { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { LanguageContext } from "../contexts/LanguageContext";

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { t } = useContext(LanguageContext);

  const handleToggle = (e) => {
    const newValue = e.target.checked;
    console.log("Dark mode toggle:", newValue);
    setDarkMode(newValue);
  };

  return (
    <div className="dark-mode-toggle">
      <label className="toggle-switch dark-mode-switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
        />
        <span className="toggle-slider dark-mode-slider"></span>
      </label>
      <span className="toggle-label dark-mode-label">
        {darkMode ? "Light Mode" : t("dark_mode")}
      </span>
    </div>
  );
}

export default DarkModeToggle;
