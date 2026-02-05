import React, { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import VoiceInput from "./VoiceInput";

export default function Assistant({ onBack }) {
  const { language, getSpeechRecognitionLang } = useContext(LanguageContext);
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "Hello! I'm your Virtual Health Assistant. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response (later connect to backend AI API)
    setTimeout(() => {
      const botResponse = {
        from: "bot",
        text: "Thanks! I'll analyze that for you. Remember to consult your doctor before making any changes to your medication."
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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
        />
        <VoiceInput 
          setInputText={setInput} 
          language={getSpeechRecognitionLang(language)}
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}
