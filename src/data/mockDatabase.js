// Mock Database - Simulates backend data with multilingual support

// Medicine names and details in different languages
const medicineData = {
  metformin: {
    en: { name: "Metformin", instructions: "Take with food", sideEffects: ["Nausea", "Drowsiness"] },
    hi: { name: "मेटफॉर्मिन", instructions: "भोजन के साथ लें", sideEffects: ["मतली", "उनीलापन"] },
    te: { name: "మెట్ఫార్మిన్", instructions: "భోజనంతో తీసుకోండి", sideEffects: ["మతిలీ", "నిద్రబారం"] },
    ta: { name: "மெட்ரோர்மின்", instructions: "உணவுடன் எடுக்கவும்", sideEffects: ["வாந்தி", "உறக்கம்"] },
    mr: { name: "मेटफॉर्मिन", instructions: "जेवणासोबत घ्या", sideEffects: ["मळमळ", "झोप"] },
    or: { name: "ମେଟଫର୍ମିନ", instructions: "ଖାଇବା ସହିତ ନିଅନ୍ତୁ", sideEffects: ["ବାନ୍ତି", "ନିଦ୍ରା"] }
  },
  insulin: {
    en: { name: "Insulin", instructions: "Inject before dinner", sideEffects: ["Hypoglycemia risk"] },
    hi: { name: "इंसुलिन", instructions: "रात के खाने से पहले इंजेक्ट करें", sideEffects: ["हाइपोग्लाइसीमिया का खतरा"] },
    te: { name: "ఇన్సులిన్", instructions: "రాత్రి భోజనము ముందు ఇంజెక్ట్ చేయండి", sideEffects: ["హైపోగ్లైసిమియా ప్రమాదం"] },
    ta: { name: "இன்சுலின்", instructions: "இரவு உணவுக்கு முன் உள்ளிடவும்", sideEffects: ["ஹைப்போகிளைசீமியா ஆபத்து"] },
    mr: { name: "इंसुलिन", instructions: "रात्रीच्या जेवणापूर्वी इंजेक्ट करा", sideEffects: ["हायपोग्लाइसीमिया धोका"] },
    or: { name: "ଇନସୁଲିନ", instructions: "ରାତ୍ରି ଖାଇବା ପୂର্বରୁ ଇଞ্জେକ୍ଟ କରନ୍ତୁ", sideEffects: ["ହାଇପୋଗ୍ଲାଇସେମିଆ ବିପଦ"] }
  },
  aspirin: {
    en: { name: "Aspirin", instructions: "Take with water", sideEffects: ["Stomach irritation"] },
    hi: { name: "एस्पिरिन", instructions: "पानी के साथ लें", sideEffects: ["पेट में जलन"] },
    te: { name: "ఆస్పిరిన్", instructions: "నీటితో తీసుకోండి", sideEffects: ["కడుపు జిల్లుతుంది"] },
    ta: { name: "அஸ்பிரின்", instructions: "தண்ணீருடன் எடுக்கவும்", sideEffects: ["வயிற்று எரிச்சல்"] },
    mr: { name: "आस्पिरिन", instructions: "पाण्यासोबत घ्या", sideEffects: ["पोटात जळजळ"] },
    or: { name: "ଆସପିରିନ", instructions: "ପାଣି ସହିତ ନିଅନ୍ତୁ", sideEffects: ["ପେଟ ଜ্বଳା"] }
  }
};

// Time of day in different languages
const timeOfDay = {
  morning: { en: "Morning", hi: "सुबह", te: "ఉదయం", ta: "காலை", mr: "सकाळ", or: "ସକାଳ" },
  afternoon: { en: "Afternoon", hi: "दोपहर", te: "మధ్యాహ్నం", ta: "மதியம்", mr: "दुपार", or: "ଦୁପହର" },
  evening: { en: "Evening", hi: "शाम", te: "సాయంత్రం", ta: "இரவு", mr: "संध्याकाळ", or: "ସନ୍ଧ୍ୟା" },
  night: { en: "Night", hi: "रात", te: "రాత్రి", ta: "இரவு", mr: "रात्री", or: "ରାତ୍ର" }
};

// Frequency in different languages
const frequencyData = {
  once_daily: { en: "Once daily", hi: "रोज़ाना एक बार", te: "రోజుకు ఒక్కసారి", ta: "ஒரு நாள் ஒரு முறை", mr: "दररोज एकदा", or: "ପ୍ରতিদিন ଥର" },
  twice_daily: { en: "Twice daily", hi: "रोज़ाना दो बार", te: "రోజుకు రెండుసార్లు", ta: "ஒரு நாள் இரண்டு முறை", mr: "दरोज दोनदा", or: "ପ୍ରতিদিন ଦୁই ଥର" }
};

// Duration in different languages
const durationData = {
  days_30: { en: "30 days", hi: "30 दिन", te: "30 రోజులు", ta: "30 நாட்கள்", mr: "30 दिवस", or: "30 ଦିନ" },
  ongoing: { en: "Ongoing", hi: "जारी", te: "కొనసాగుతుంది", ta: "தொடர்ந்து", mr: "सुरू", or: "ଚାଲୁ ଅଛି" }
};

// Helper to get translated medicine data
const getTranslatedMedicine = (medicineKey, language = "en") => {
  const data = medicineData[medicineKey];
  return data ? data[language] || data.en : { name: medicineKey, instructions: "", sideEffects: [] };
};

// Helper to get translated time
const getTranslatedTime = (timeKey, language = "en") => {
  const key = timeKey.toLowerCase().replace(" ", "_");
  const data = timeOfDay[key] || timeOfDay.morning;
  return data[language] || data.en;
};

// Helper to get translated frequency
const getTranslatedFrequency = (freqKey, language = "en") => {
  const key = freqKey.toLowerCase().replace(" ", "_");
  const data = frequencyData[key] || frequencyData.once_daily;
  return data[language] || data.en;
};

// Helper to get translated duration
const getTranslatedDuration = (durKey, language = "en") => {
  if (durKey.toLowerCase().includes("30")) {
    const data = durationData.days_30;
    return data[language] || data.en;
  }
  const data = durationData.ongoing;
  return data[language] || data.en;
};

const mockDatabase = {
  patient: {
    name: "Rahul Sharma",
    age: 45,
    condition: "Diabetes",
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    address: "123 Health Street, Mumbai, Maharashtra",
    emergencyContact: {
      name: "Priya Sharma",
      relation: "Wife",
      phone: "+91 98765 43211"
    }
  },

  // Updated medicines array with multilingual support
  medicines: [
    { 
      id: 1,
      key: "metformin",
      dosage: "500mg", 
      time: "Morning",
      frequency: "Twice daily",
      duration: "30 days",
    },
    { 
      id: 2,
      key: "insulin",
      dosage: "10 units", 
      time: "Night",
      frequency: "Once daily",
      duration: "30 days",
    },
    {
      id: 3,
      key: "aspirin",
      dosage: "75mg",
      time: "Morning",
      frequency: "Once daily",
      duration: "Ongoing",
    }
  ],

  prescriptionHistory: [
    {
      id: 1,
      doctor: "Dr. Sharma",
      date: "2026-01-20",
      medicines: ["Metformin", "Insulin"],
      condition: "Diabetes",
      notes: "Follow up in 2 weeks"
    },
    {
      id: 2,
      doctor: "Dr. Patel",
      date: "2025-12-15",
      medicines: ["Metformin"],
      condition: "Diabetes",
      notes: "Blood sugar under control"
    },
    {
      id: 3,
      doctor: "Dr. Kumar",
      date: "2025-11-10",
      medicines: ["Aspirin"],
      condition: "Cardiac care",
      notes: "Preventive medication"
    }
  ],

  dietPlan: {
    eat: [
      "Green vegetables (Spinach, Broccoli)",
      "Whole grains (Oats, Brown rice)",
      "Fresh fruits (Apple, Berries)",
      "Lean proteins (Chicken, Fish)",
      "Low-fat dairy products",
      "Nuts and seeds (Almonds, Walnuts)"
    ],
    avoid: [
      "Sugar and sugary foods",
      "Fried and processed foods",
      "White bread and refined grains",
      "Sugary drinks and sodas",
      "High-sodium foods",
      "Alcohol"
    ],
    mealPlan: {
      breakfast: "Oats with fruits and nuts",
      lunch: "Brown rice with vegetables and lean protein",
      dinner: "Grilled fish with salad",
      snacks: "Apple, almonds, yogurt"
    },
    tips: [
      "Eat small, frequent meals",
      "Stay hydrated with water",
      "Monitor carbohydrate intake",
      "Include fiber-rich foods"
    ]
  },

  wearable: {
    heartRate: 78,
    spo2: 97,
    steps: 4200,
    calories: 1850,
    sleepHours: 7.5,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    lastUpdated: "2026-02-05T10:30:00"
  },

  healthReports: [
    {
      id: 1,
      type: "Prescription",
      name: "Prescription - Dr. Sharma",
      date: "2026-01-20",
      size: "2.3 MB",
      icon: "📄",
      doctor: "Dr. Sharma",
      condition: "Diabetes"
    },
    {
      id: 2,
      type: "Lab Report",
      name: "Blood Test Report",
      date: "2026-01-10",
      size: "1.8 MB",
      icon: "🧪",
      doctor: "Dr. Sharma",
      condition: "Routine checkup"
    },
    {
      id: 3,
      type: "Prescription",
      name: "Prescription - Dr. Patel",
      date: "2025-12-20",
      size: "2.1 MB",
      icon: "📄",
      doctor: "Dr. Patel",
      condition: "Diabetes follow-up"
    },
    {
      id: 4,
      type: "X-Ray",
      name: "Chest X-Ray Report",
      date: "2025-12-15",
      size: "4.5 MB",
      icon: "🩻",
      doctor: "Dr. Kumar",
      condition: "Chest examination"
    },
    {
      id: 5,
      type: "Medical History",
      name: "Annual Health Checkup",
      date: "2025-11-01",
      size: "3.2 MB",
      icon: "📋",
      doctor: "Dr. Sharma",
      condition: "Annual checkup"
    }
  ],

  reminders: [
    {
      id: 1,
      type: "medicine",
      title: "Take Metformin",
      time: "08:00",
      frequency: "Daily",
      enabled: true
    },
    {
      id: 2,
      type: "medicine",
      title: "Take Insulin",
      time: "20:00",
      frequency: "Daily",
      enabled: true
    },
    {
      id: 3,
      type: "appointment",
      title: "Follow-up with Dr. Sharma",
      date: "2026-02-15",
      time: "10:00",
      enabled: true
    },
    {
      id: 4,
      type: "test",
      title: "Blood Sugar Test",
      time: "09:00",
      frequency: "Weekly",
      enabled: true
    }
  ],

  healthMetrics: {
    bloodPressure: [
      { date: "Mon", systolic: 120, diastolic: 80 },
      { date: "Tue", systolic: 125, diastolic: 82 },
      { date: "Wed", systolic: 118, diastolic: 78 },
      { date: "Thu", systolic: 122, diastolic: 80 },
      { date: "Fri", systolic: 120, diastolic: 79 },
      { date: "Sat", systolic: 119, diastolic: 78 },
      { date: "Sun", systolic: 121, diastolic: 80 },
    ],
    bloodSugar: [
      { date: "Mon", fasting: 95, postMeal: 140 },
      { date: "Tue", fasting: 98, postMeal: 145 },
      { date: "Wed", fasting: 92, postMeal: 138 },
      { date: "Thu", fasting: 96, postMeal: 142 },
      { date: "Fri", fasting: 94, postMeal: 139 },
      { date: "Sat", fasting: 97, postMeal: 143 },
      { date: "Sun", fasting: 95, postMeal: 141 },
    ],
    medicineAdherence: {
      taken: 85,
      missed: 15
    },
    dietCompliance: {
      compliant: 78,
      nonCompliant: 22
    }
  }
};

// Helper functions to interact with mock database
export const getPatientInfo = () => mockDatabase.patient;

export const getMedicines = (language = "en") => {
  return mockDatabase.medicines.map(med => ({
    ...med,
    name: getTranslatedMedicine(med.key, language).name,
    instructions: getTranslatedMedicine(med.key, language).instructions,
    sideEffects: getTranslatedMedicine(med.key, language).sideEffects,
    time: getTranslatedTime(med.time, language),
    frequency: getTranslatedFrequency(med.frequency, language),
    duration: getTranslatedDuration(med.duration, language)
  }));
};

export const getPrescriptionHistory = () => mockDatabase.prescriptionHistory;
export const getDietPlan = () => mockDatabase.dietPlan;
export const getWearableData = () => mockDatabase.wearable;
export const getHealthReports = () => mockDatabase.healthReports;
export const getReminders = () => mockDatabase.reminders;
export const getHealthMetrics = () => mockDatabase.healthMetrics;
export const getAllData = () => mockDatabase;

export default mockDatabase;
