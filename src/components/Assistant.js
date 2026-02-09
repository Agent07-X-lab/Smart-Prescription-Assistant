import React, { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { ElderlyModeContext } from "../contexts/ElderlyModeContext";
import { getBotReply, getGreeting } from "../services/chatbotAPI";
import VoiceInput from "./VoiceInput";

// Contextual health responses based on symptoms
const symptomResponses = {
  chest_pain: {
    response: "⚠️ Chest pain can be serious. Please seek immediate medical attention at the nearest hospital or call emergency services. This could indicate heart-related issues that require prompt evaluation by a cardiologist.",
    specialist: "Cardiologist",
    urgency: "high"
  },
  headache: {
    response: "For headaches, try: 1) Rest in a quiet, dark room 2) Stay hydrated 3) Apply a cold or warm compress 4) Take OTC pain relievers if needed. If headaches are severe, frequent, or accompanied by vision changes, consult a doctor.",
    specialist: "Neurologist",
    urgency: "low"
  },
  fever: {
    response: "For fever: 1) Stay hydrated with water and fluids 2) Rest adequately 3) Use fever-reducing medications like paracetamol 4) Keep room temperature comfortable. Seek medical help if fever exceeds 103°F or lasts more than 3 days.",
    specialist: "General Physician",
    urgency: "medium"
  },
  cough: {
    response: "For cough: 1) Stay hydrated with warm water/honey 2) Use a humidifier 3) Gargle with salt water 4) Avoid irritants like smoke. See a doctor if cough persists more than 2 weeks or produces blood.",
    specialist: "Pulmonologist",
    urgency: "low"
  },
  cold: {
    response: "For cold: 1) Get plenty of rest 2) Drink warm fluids 3) Use saline nasal drops 4) Gargle with warm salt water 5) Take OTC cold medications. Consult a doctor if symptoms worsen or don't improve in 10 days.",
    specialist: "General Physician",
    urgency: "low"
  },
  stomach_pain: {
    response: "For stomach pain: 1) Avoid solid foods temporarily 2) Stay hydrated with small sips of water 3) Try bland foods like toast or rice 4) Apply a warm compress. Seek immediate care if pain is severe or accompanied by fever/vomiting.",
    specialist: "Gastroenterologist",
    urgency: "medium"
  },
  back_pain: {
    response: "For back pain: 1) Apply ice/heat packs 2) Do gentle stretching 3) Maintain good posture 4) Use OTC pain relievers 5) Consider physical therapy. See a doctor if pain radiates to legs or lasts more than 4 weeks.",
    specialist: "Orthopedist",
    urgency: "low"
  },
  dizziness: {
    response: "For dizziness: 1) Sit or lie down immediately 2) Avoid sudden movements 3) Stay hydrated 4) Get up slowly from sitting/lying 5) Avoid bright lights. See a doctor if dizziness is frequent or accompanied by chest pain/shortness of breath.",
    specialist: "Neurologist",
    urgency: "medium"
  },
  shortness_breath: {
    response: "⚠️ Shortness of breath requires attention. Try: 1) Sit upright and relax 2) Practice deep breathing 3) Open windows for fresh air. Seek immediate medical help if this is sudden, severe, or accompanied by chest pain.",
    specialist: "Pulmonologist",
    urgency: "high"
  },
  fatigue: {
    response: "For fatigue: 1) Ensure 7-9 hours of sleep 2.5. Stay hydrated 3) Eat balanced meals 4) Exercise lightly 5) Manage stress. See a doctor if fatigue persists for more than 2 weeks despite rest.",
    specialist: "General Physician",
    urgency: "low"
  },
  joint_pain: {
    response: "For joint pain: 1) Rest the affected joint 2.5. Apply ice for 15-20 minutes 3) Use compression wraps 4) Elevate the joint 5) Take OTC anti-inflammatories. Consult a doctor if pain is severe or joints are swollen/red.",
    specialist: "Rheumatologist",
    urgency: "medium"
  },
  skin_rash: {
    response: "For skin rashes: 1) Avoid scratching 2) Apply moisturizer 3) Use OTC hydrocortisone cream 4) Take antihistamines for itching 5) Identify and avoid triggers. See a dermatologist if rash spreads, oozes, or doesn't improve.",
    specialist: "Dermatologist",
    urgency: "low"
  },
  anxiety: {
    response: "For anxiety: 1) Practice deep breathing exercises 2) Try meditation or mindfulness 3) Exercise regularly 4) Limit caffeine 5) Get adequate sleep 6) Talk to someone you trust. Consider seeing a mental health professional for persistent anxiety.",
    specialist: "Psychiatrist",
    urgency: "low"
  },
  depression: {
    response: "I'm sorry you're feeling down. Please: 1) Talk to someone you trust 2) Stay connected with loved ones 3) Engage in activities you enjoy 4) Maintain routine 5) Seek professional help. A psychiatrist or psychologist can provide proper support.",
    specialist: "Psychiatrist",
    urgency: "medium"
  },
  diabetes: {
    response: "For diabetes management: 1) Monitor blood sugar regularly 2) Take medications as prescribed 3) Follow a balanced diet low in sugar 4) Exercise regularly 5) Attend all doctor appointments. Consult an endocrinologist for specialized care.",
    specialist: "Endocrinologist",
    urgency: "medium"
  },
  high_bp: {
    response: "For blood pressure management: 1) Reduce sodium intake 2) Eat potassium-rich foods 3) Exercise regularly 4) Maintain healthy weight 5) Limit alcohol 6) Manage stress 7) Take medications as prescribed. Consult a cardiologist.",
    specialist: "Cardiologist",
    urgency: "medium"
  },
  cholesterol: {
    response: "For cholesterol management: 1) Eat heart-healthy foods (fruits, vegetables, whole grains) 2) Avoid trans fats 3) Exercise regularly 4) Maintain healthy weight 5) Take medications if prescribed. See a cardiologist for lipid management.",
    specialist: "Cardiologist",
    urgency: "low"
  }

};

export default function Assistant({ onBack }) {
  const { language, getSpeechRecognitionLang, t } = useContext(LanguageContext);
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
      // Remove colons and other symbols that shouldn't be read
      const cleanedText = text.replace(/[:;]/g, "").replace(/\s+/g, " ").trim();
      const speech = new SpeechSynthesisUtterance(cleanedText);
      speech.lang = getSpeechRecognitionLang(language);
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  // Detect symptoms in user input and provide contextual responses
  const detectSymptoms = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    const keywords = Object.keys(symptomResponses);
    
    for (const symptom of keywords) {
      if (lowerInput.includes(symptom.replace(/_/g, " ")) || 
          lowerInput.includes(symptom.replace(/_/g, " and "))) {
        return symptomResponses[symptom];
      }
      
      // Handle special cases
      if (symptom === "chest_pain" && (lowerInput.includes("chest pain") || lowerInput.includes("chest tightness")))
        return symptomResponses[symptom];
      if (symptom === "stomach_pain" && (lowerInput.includes("stomach pain") || lowerInput.includes("abdominal pain") || lowerInput.includes("belly pain")))
        return symptomResponses[symptom];
      if (symptom === "shortness_breath" && (lowerInput.includes("shortness of breath") || lowerInput.includes("breathing difficulty") || lowerInput.includes("cant breathe")))
        return symptomResponses[symptom];
      if (symptom === "high_bp" && (lowerInput.includes("high blood pressure") || lowerInput.includes("bp high") || lowerInput.includes("hypertension")))
        return symptomResponses[symptom];
    }
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      // Check for contextual symptom responses first
      const symptomMatch = detectSymptoms(userInput);
      
      let botResponseText;
      if (symptomMatch) {
        // Add urgency indicator based on severity
        const urgencyPrefix = symptomMatch.urgency === "high" 
          ? "🚨 **URGENT**: "
          : symptomMatch.urgency === "medium"
          ? "⚠️ **Important**: "
          : "";
        
        botResponseText = `${urgencyPrefix}${symptomMatch.response}\n\n👨‍⚕️ **Recommended Specialist**: ${symptomMatch.specialist}`;
      } else {
        // Use enhanced chatbot API for general queries
        botResponseText = await getBotReply(userInput, language);
      }
      
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
        text: t("error_occurred")
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
    <div className="assistant-container">
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
          placeholder={t("chat_placeholder")}
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
          {isLoading ? t("loading") : t("send")}
        </button>
      </div>
    </div>
  );
}
