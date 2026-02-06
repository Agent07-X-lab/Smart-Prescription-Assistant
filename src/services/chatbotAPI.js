// Chatbot API Service - Predefined answers + Mock API integration

// Predefined answers for common health questions
const predefinedAnswers = {
  diabetes: {
    en: "Diabetes is a condition where blood sugar levels are too high. It occurs when your body doesn't produce enough insulin or can't use it effectively. Common symptoms include frequent urination, increased thirst, and fatigue. Managing diabetes involves medication, diet control, and regular exercise.",
    hi: "मधुमेह एक ऐसी स्थिति है जहां रक्त शर्करा का स्तर बहुत अधिक होता है। यह तब होता है जब आपका शरीर पर्याप्त इंसुलिन का उत्पादन नहीं करता या इसे प्रभावी ढंग से उपयोग नहीं कर सकता।",
    te: "మధుమేహం అనేది రక్తంలో చక్కర స్థాయి చాలా ఎక్కువగా ఉండే పరిస్థితి.",
    ta: "நீரிழிவு என்பது இரத்த சர்க்கரை அளவு மிக அதிகமாக இருக்கும் நிலை.",
    mr: "मधुमेह ही एक अशी स्थिती आहे जिथे रक्तातील साखरेची पातळी खूप जास्त असते.",
    or: "ମଧୁମେହ ହେଉଛି ଏକ ଅବସ୍ଥା ଯେଉଁଠାରେ ରକ୍ତରେ ଶର୍କରାର ସ୍ତର ଅତ୍ୟଧିକ ହୋଇଯାଏ।"
  },
  medicine: {
    en: "You should take medicines exactly as prescribed by your doctor. Follow the schedule: Morning medicines (8 AM), Afternoon medicines (2 PM), and Night medicines (8 PM). Always take medicines with food or water as instructed. Never skip doses and complete the full course.",
    hi: "आपको अपने डॉक्टर द्वारा निर्धारित दवाएं बिल्कुल वैसे ही लेनी चाहिए। सुबह की दवाएं (8 बजे), दोपहर की दवाएं (2 बजे), और रात की दवाएं (8 बजे) लें।",
    te: "మీరు మీ వైద్యుడు సూచించిన విధంగానే మందులు తీసుకోవాలి.",
    ta: "நீங்கள் உங்கள் மருத்துவர் பரிந்துரைத்தபடி மருந்துகளை எடுத்துக்கொள்ள வேண்டும்.",
    mr: "तुम्ही तुमच्या डॉक्टरांनी सांगितलेल्या प्रमाणेच औषधे घ्यावीत.",
    or: "ଆପଣ ଆପଣଙ୍କ ଡାକ୍ତରଙ୍କ ଦ୍ୱାରା ନିର୍ଦ୍ଦିଷ୍ଟ ଔଷଧଗୁଡ଼ିକୁ ସଠିକ୍ ଭାବରେ ନେବା ଉଚିତ୍।"
  },
  diet: {
    en: "For diabetes management, include vegetables (spinach, broccoli), whole grains (oats, brown rice), fresh fruits (apples, berries), lean proteins, and low-fat dairy. Avoid sugar, fried foods, white bread, sugary drinks, and high-sodium foods. Eat small, frequent meals and stay hydrated.",
    hi: "मधुमेह प्रबंधन के लिए, हरी सब्जियां, साबुत अनाज, ताजे फल, दुबला प्रोटीन शामिल करें। चीनी, तली हुई चीजें, सफेद ब्रेड, मीठे पेय से बचें।",
    te: "మధుమేహ నిర్వహణ కోసం, కూరగాయలు, పూర్తి ధాన్యాలు, తాజా పళ్లు, తక్కువ కొవ్వు ప్రోటీన్ చేర్చండి.",
    ta: "நீரிழிவு நிர்வாகத்திற்கு, காய்கறிகள், முழு தானியங்கள், புதிய பழங்கள், குறைந்த கொழுப்பு புரதங்களைச் சேர்க்கவும்.",
    mr: "मधुमेह व्यवस्थापनासाठी, भाज्या, संपूर्ण धान्ये, ताजे फळे, दुबळे प्रथिने समाविष्ट करा.",
    or: "ମଧୁମେହ ପରିଚାଳନା ପାଇଁ, ଶାକସବଜି, ସମ୍ପୂର୍ଣ୍ଣ ଶସ୍ୟ, ତାଜା ଫଳ, କମ୍ ଚର୍ବି ପ୍ରୋଟିନ୍ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ।"
  },
  side_effects: {
    en: "Some medicines may cause side effects like drowsiness, nausea, dizziness, or stomach irritation. If you experience severe side effects such as difficulty breathing, chest pain, or severe allergic reactions, consult your doctor immediately. Always inform your doctor about any unusual symptoms.",
    hi: "कुछ दवाएं नींद, मतली, चक्कर आना, या पेट में जलन जैसे दुष्प्रभाव पैदा कर सकती हैं। गंभीर दुष्प्रभाव होने पर तुरंत डॉक्टर से सलाह लें।",
    te: "కొన్ని మందులు నిద్ర, వికారం, తలతిరుగుడు లేదా కడుపు చికాకు వంటి ప్రతికూల ప్రభావాలను కలిగించవచ్చు.",
    ta: "சில மருந்துகள் தூக்கம், குமட்டல், தலைச்சுற்றல் அல்லது வயிற்று எரிச்சல் போன்ற பக்க விளைவுகளை ஏற்படுத்தக்கூடும்.",
    mr: "काही औषधांमुळे झोप, मळमळ, चक्कर किंवा पोटात जळजळ यासारखे दुष्परिणाम होऊ शकतात.",
    or: "କେତେକ ଔଷଧ ନିଦ୍ରା, ବାନ୍ତି, ମୁଣ୍ଡ ବୁଲାଇବା କିମ୍ବା ପେଟରେ ଜ୍ୱାଳା ପରି ପାର୍ଶ୍ୱ ପ୍ରଭାବ ସୃଷ୍ଟି କରିପାରେ।"
  },
  blood_pressure: {
    en: "Blood pressure is the force of blood against artery walls. Normal BP is around 120/80 mmHg. High blood pressure (hypertension) can lead to heart disease and stroke. Manage it with medication, low-salt diet, regular exercise, and stress reduction.",
    hi: "रक्तचाप धमनियों की दीवारों के खिलाफ रक्त का दबाव है। सामान्य बीपी लगभग 120/80 mmHg होता है।",
    te: "రక్తపోటు అనేది ధమనుల గోడలపై రక్తం యొక్క శక్తి.",
    ta: "இரத்த அழுத்தம் என்பது தமனி சுவர்களுக்கு எதிராக இரத்தத்தின் விசையாகும்.",
    mr: "रक्तदाब म्हणजे धमन्यांच्या भिंतींविरुद्ध रक्ताचा दाब.",
    or: "ରକ୍ତଚାପ ହେଉଛି ଧମନୀ କାନ୍ଥଗୁଡ଼ିକ ବିରୁଦ୍ଧରେ ରକ୍ତର ବଳ।"
  },
  exercise: {
    en: "Regular exercise helps manage diabetes and improves overall health. Aim for 30 minutes of moderate exercise daily, like walking, cycling, or swimming. Always check your blood sugar before and after exercise, and stay hydrated.",
    hi: "नियमित व्यायाम मधुमेह प्रबंधन में मदद करता है और समग्र स्वास्थ्य में सुधार करता है।",
    te: "నియమిత వ్యాయామం మధుమేహ నిర్వహణలో సహాయపడుతుంది మరియు మొత్తం ఆరోగ్యాన్ని మెరుగుపరుస్తుంది.",
    ta: "வழக்கமான உடற்பயிற்சி நீரிழிவு நிர்வாகத்திற்கு உதவுகிறது மற்றும் ஒட்டுமொத்த ஆரோக்கியத்தை மேம்படுத்துகிறது.",
    mr: "नियमित व्यायाम मधुमेह व्यवस्थापनात मदत करते आणि एकूण आरोग्य सुधारते.",
    or: "ନିୟମିତ ବ୍ୟାୟାମ ମଧୁମେହ ପରିଚାଳନାରେ ସାହାଯ୍ୟ କରେ ଏବଂ ସାମଗ୍ରିକ ସ୍ୱାସ୍ଥ୍ୟରେ ସୁଧାର ଆଣେ।"
  }
};

// Keywords mapping for question detection
const keywordMap = {
  diabetes: ["diabetes", "diabetic", "blood sugar", "sugar", "glucose", "insulin"],
  medicine: ["medicine", "medication", "drug", "pill", "tablet", "dosage", "when to take", "schedule"],
  diet: ["diet", "food", "eat", "nutrition", "meal", "what to eat", "avoid"],
  side_effects: ["side effect", "side effects", "adverse", "reaction", "symptom", "problem"],
  blood_pressure: ["blood pressure", "bp", "hypertension", "pressure"],
  exercise: ["exercise", "workout", "fitness", "physical activity", "walking"]
};

/**
 * Detect which predefined answer category matches the user's question
 */
const detectCategory = (message, language = "en") => {
  const lowerMsg = message.toLowerCase();
  
  for (const [category, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => lowerMsg.includes(keyword))) {
      return category;
    }
  }
  
  return null;
};

/**
 * Get predefined answer based on category and language
 */
const getPredefinedAnswer = (category, language = "en") => {
  if (predefinedAnswers[category] && predefinedAnswers[category][language]) {
    return predefinedAnswers[category][language];
  }
  // Fallback to English if translation not available
  return predefinedAnswers[category]?.en || null;
};

/**
 * Mock API call to chatbot backend
 * Simulates API call with setTimeout
 */
const mockAPICall = async (message, language = "en") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate AI analysis response
      const responses = {
        en: "I'm analyzing your query. Based on your health profile, I recommend consulting your doctor for personalized medical advice. For general health information, I can help with questions about medicines, diet, exercise, and common health conditions.",
        hi: "मैं आपके प्रश्न का विश्लेषण कर रहा हूं। आपके स्वास्थ्य प्रोफ़ाइल के आधार पर, मैं व्यक्तिगत चिकित्सा सलाह के लिए अपने डॉक्टर से परामर्श करने की सलाह देता हूं।",
        te: "నేను మీ ప్రశ్నను విశ్లేషిస్తున్నాను. మీ ఆరోగ్య ప్రొఫైల్ ఆధారంగా, వ్యక్తిగత వైద్య సలహా కోసం మీ వైద్యుడిని సంప్రదించమని నేను సిఫార్సు చేస్తున్నాను.",
        ta: "நான் உங்கள் கேள்வியை பகுப்பாய்வு செய்கிறேன். உங்கள் சுகாதார சுயவிவரத்தின் அடிப்படையில், தனிப்பட்ட மருத்துவ ஆலோசனைக்கு உங்கள் மருத்துவரை அணுகுமாறு பரிந்துரைக்கிறேன்.",
        mr: "मी तुमच्या प्रश्नाचे विश्लेषण करत आहे. तुमच्या आरोग्य प्रोफाइलच्या आधारे, वैयक्तिक वैद्यकीय सल्ल्यासाठी तुमच्या डॉक्टरांचा सल्ला घेण्याची शिफारस करतो.",
        or: "ମୁଁ ଆପଣଙ୍କର ପ୍ରଶ୍ନର ବିଶ୍ଳେଷଣ କରୁଛି। ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରୋଫାଇଲ୍ ଉପରେ ଆଧାର କରି, ବ୍ୟକ୍ତିଗତ ଚିକିତ୍ସା ପରାମର୍ଶ ପାଇଁ ମୁଁ ଆପଣଙ୍କ ଡାକ୍ତରଙ୍କୁ ସମ୍ପର୍କ କରିବାକୁ ସୁପାରିଶ କରୁଛି।"
      };
      
      resolve(responses[language] || responses.en);
    }, 1000); // Simulate network delay
  });
};

/**
 * Main chatbot API function
 * Checks predefined answers first, then falls back to mock API
 */
export const getBotReply = async (message, language = "en") => {
  if (!message || !message.trim()) {
    return {
      en: "Please ask me a health-related question.",
      hi: "कृपया मुझसे स्वास्थ्य संबंधी प्रश्न पूछें।",
      te: "దయచేసి నాకు ఆరోగ్య సంబంధిత ప్రశ్న అడగండి.",
      ta: "தயவுசெய்து என்னிடம் சுகாதாரம் தொடர்பான கேள்வியைக் கேளுங்கள்.",
      mr: "कृपया मला आरोग्याशी संबंधित प्रश्न विचारा.",
      or: "ଦୟାକରି ମୋତେ ଏକ ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।"
    }[language] || "Please ask me a health-related question.";
  }

  const lowerMessage = message.toLowerCase().trim();
  
  // Check for predefined answers
  const category = detectCategory(lowerMessage, language);
  
  if (category) {
    const answer = getPredefinedAnswer(category, language);
    if (answer) {
      return answer;
    }
  }
  
  // If no predefined answer matches, use mock API
  return await mockAPICall(message, language);
};

/**
 * Get greeting message based on language
 */
export const getGreeting = (language = "en") => {
  const greetings = {
    en: "Hello! I'm your Virtual Health Assistant. How can I help you today?",
    hi: "नमस्ते! मैं आपका वर्चुअल हेल्थ असिस्टेंट हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    te: "నమస్కారం! నేను మీ వర్చువల్ హెల్త్ అసిస్టెంట్. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    ta: "வணக்கம்! நான் உங்கள் மெய்நிகர் சுகாதார உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    mr: "नमस्कार! मी तुमचा व्हर्च्युअल हेल्थ असिस्टंट आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
    or: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ଭର୍ଚୁଆଲ୍ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"
  };
  
  return greetings[language] || greetings.en;
};

const chatbotAPI = {
  getBotReply,
  getGreeting,
  predefinedAnswers,
  keywordMap
};

export default chatbotAPI;
