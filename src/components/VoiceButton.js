import React, { useState } from "react";

function VoiceButton({ text }) {
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
    const speech = new SpeechSynthesisUtterance(text);
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
        {isSpeaking ? "⏸️ Stop Reading" : "🔊 Listen to Prescription"}
      </button>
    </div>
  );
}

export default VoiceButton;
