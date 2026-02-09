import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function VoiceButton({ text }) {
  const { language, getSpeechRecognitionLang, t } = useContext(LanguageContext);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech Synthesis API is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const cleanedText = text.replace(/[:;]/g, "").replace(/\s+/g, " ").trim();
    const speech = new SpeechSynthesisUtterance(cleanedText);
    speech.lang = getSpeechRecognitionLang(language);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="card">
      <button
        onClick={speak}
        className={isSpeaking ? "pulse" : ""}
        style={{
          width: "100%",
          justifyContent: "center",
          fontSize: "1.1rem",
          padding: "14px 24px",
        }}
      >
        {isSpeaking ? t("stop_reading") : t("listen_prescription")}
      </button>
    </div>
  );
}

export default VoiceButton;
