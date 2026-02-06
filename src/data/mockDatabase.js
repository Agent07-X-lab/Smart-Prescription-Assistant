// Mock Database - Simulates backend data
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

  medicines: [
    { 
      id: 1,
      name: "Metformin", 
      dosage: "500mg", 
      time: "Morning",
      frequency: "Twice daily",
      duration: "30 days",
      instructions: "Take with food",
      sideEffects: ["Nausea", "Drowsiness"]
    },
    { 
      id: 2,
      name: "Insulin", 
      dosage: "10 units", 
      time: "Night",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Inject before dinner",
      sideEffects: ["Hypoglycemia risk"]
    },
    {
      id: 3,
      name: "Aspirin",
      dosage: "75mg",
      time: "Morning",
      frequency: "Once daily",
      duration: "Ongoing",
      instructions: "Take with water",
      sideEffects: ["Stomach irritation"]
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
export const getMedicines = () => mockDatabase.medicines;
export const getPrescriptionHistory = () => mockDatabase.prescriptionHistory;
export const getDietPlan = () => mockDatabase.dietPlan;
export const getWearableData = () => mockDatabase.wearable;
export const getHealthReports = () => mockDatabase.healthReports;
export const getReminders = () => mockDatabase.reminders;
export const getHealthMetrics = () => mockDatabase.healthMetrics;
export const getAllData = () => mockDatabase;

export default mockDatabase;
