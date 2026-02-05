import React, { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { ElderlyModeContext } from "../contexts/ElderlyModeContext";
import { getBotReply, getGreeting } from "../services/chatbotAPI";
import VoiceInput from "./VoiceInput";

export default function Assistant({ onBack }) {
  const { language, getSpeechRecognitionLang } = useContext(LanguageContext);
  const { elderlyMode } = useContext(ElderlyModeContext);
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: getGreeting(language)
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update greeting when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].from === "bot") {
      setMessages([{ from: "bot", text: getGreeting(language) }]);
    }
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const speakText = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = getSpeechRecognitionLang(language);
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      // Use enhanced chatbot API with predefined answers + mock API
      const botResponseText = await getBotReply(userInput, language);
      
      const botResponse = {
        from: "bot",
        text: botResponseText
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Auto voice reply (always enabled in elderly mode)
      if (elderlyMode) {
        speakText(botResponse.text);
      }
    } catch (error) {
      console.error("Error getting bot response:", error);
      const errorResponse = {
        from: "bot",
        text: "Sorry, I encountered an error. Please try again."
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="assistant">
      <div className="assistant-header">
        <button onClick={onBack} className="back-button">← Back</button>
        <h2>💬 AI Health Assistant</h2>
      </div>
      
      <div className="chat-box">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`message ${m.from === "bot" ? "bot-msg" : "user-msg"}`}
          >
            {m.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about medicines, diet, or prescription..."
          className="chat-input-field"
          disabled={isLoading}
        />
        <VoiceInput 
          setInputText={setInput} 
          language={getSpeechRecognitionLang(language)}
        />
        <button 
          onClick={sendMessage} 
          className="send-button"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
