import React, { useState, useEffect, useContext, useCallback } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { getBotReply, getGreeting } from "../services/chatbotAPI";

function VoiceOnlyMode({ onBack }) {
  const { language, getSpeechRecognitionLang } = useContext(LanguageContext);
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const speakText = useCallback((text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = getSpeechRecognitionLang(language);
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.volume = 1;
      window.speechSynthesis.speak(speech);
    }
  }, [getSpeechRecognitionLang, language]);

  const handleUserSpeech = useCallback(async (transcript) => {
    if (isProcessing) return;
    
    const userMessage = { from: "user", text: transcript };
    setConversation((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Use enhanced chatbot API with predefined answers + mock API
      const botResponseText = await getBotReply(transcript, language);
      
      const botResponse = {
        from: "bot",
        text: botResponseText,
      };
      setConversation((prev) => [...prev, botResponse]);
      
      // Always speak the response in voice-only mode
      speakText(botResponse.text);
    } catch (error) {
      console.error("Error getting bot response:", error);
      const errorResponse = {
        from: "bot",
        text: "Sorry, I encountered an error. Please try again.",
      };
      setConversation((prev) => [...prev, errorResponse]);
      speakText(errorResponse.text);
    } finally {
      setIsProcessing(false);
    }
  }, [speakText, language, isProcessing]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = getSpeechRecognitionLang("en");

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      if (transcript) {
        handleUserSpeech(transcript);
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        setIsListening(false);
      }
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUserSpeech, isListening]);


  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      const welcomeMessage = {
        from: "bot",
        text: getGreeting(language) + " You can speak your health questions now.",
      };
      setConversation([welcomeMessage]);
      speakText(welcomeMessage.text);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="voice-only-screen">
      <div className="card">
        <div className="voice-only-header">
          <button onClick={onBack} className="back-button-header">← Back</button>
          <h2>🎙️ Voice-Only Mode</h2>
        </div>

        <div className="voice-only-content">
          <div className="voice-button-large-container">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`voice-button-large ${isListening ? "listening" : ""}`}
            >
              {isListening ? "⏸️ Stop Listening" : "🎤 Talk to Health Assistant"}
            </button>
            {isListening && (
              <div className="listening-indicator">
                <div className="pulse-ring"></div>
                <p>Listening...</p>
              </div>
            )}
          </div>

          {conversation.length > 0 && (
            <div className="voice-conversation">
              <h3>Conversation</h3>
              <div className="voice-messages">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`voice-message ${msg.from === "bot" ? "bot" : "user"}`}
                  >
                    <span className="voice-message-icon">
                      {msg.from === "bot" ? "🤖" : "👤"}
                    </span>
                    <span className="voice-message-text">{msg.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceOnlyMode;
