import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <span className="language-icon">🌍</span>
      <select
        value={language}
        onChange={handleChange}
        className="language-select"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
        <option value="mr">Marathi</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
