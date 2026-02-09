import React, { createContext, useState, useContext } from "react";
import { translations } from "../data/translations";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const languageMap = {
    en: "English",
    hi: "Hindi",
    te: "Telugu",
    ta: "Tamil",
    mr: "Marathi",
    or: "Odia",
  };

  const getLanguageName = (code) => {
    return languageMap[code] || "English";
  };

  const getSpeechRecognitionLang = (code) => {
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      te: "te-IN",
      ta: "ta-IN",
      mr: "mr-IN",
      or: "or-IN",
    };
    return langMap[code] || "en-US";
  };

  // Get translation for a key
  const t = (key) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    // Fallback to English if translation not available
    if (translations[key] && translations[key]["en"]) {
      return translations[key]["en"];
    }
    // Return the key itself if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        getLanguageName,
        getSpeechRecognitionLang,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
