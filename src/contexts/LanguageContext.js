import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const languageMap = {
    en: "English",
    hi: "Hindi",
    te: "Telugu",
    ta: "Tamil",
    mr: "Marathi",
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
    };
    return langMap[code] || "en-US";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        getLanguageName,
        getSpeechRecognitionLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
