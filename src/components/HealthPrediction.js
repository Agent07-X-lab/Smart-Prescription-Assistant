import React, { useState, useEffect } from "react";

export default function HealthPrediction({ onBack }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [healthScore, setHealthScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [detectedIssues, setDetectedIssues] = useState([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
    bmiCategory: "",
    smoking: "",
    alcohol: "",
    exercise: "",
    sleep: "",
    diet: "",
    stress: "",
    bloodPressure: "",
    cholesterol: "",
    bloodSugar: "",
    symptoms: [],
    existingConditions: []
  });

  // BMI calculation
  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      let category = "";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi >= 18.5 && bmi < 25) category = "Normal";
      else if (bmi >= 25 && bmi < 30) category = "Overweight";
      else category = "Obese";
      
      setFormData(prev => ({ ...prev, bmi, bmiCategory: category }));
    }
  }, [formData.height, formData.weight]);

  // Progress bar
  useEffect(() => {
    if (step === 1) setProgress(33);
    else if (step === 2) setProgress(66);
    else if (step === 3) setProgress(100);
  }, [step]);

  // Health score calculation
  const calculateHealthScore = () => {
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      let score = 100;
      const issues = [];
      const healthSuggestions = [];
      const categorizedSuggestions = {
        immediate: [],
        shortTerm: [],
        longTerm: []
      };

      // Age factor
      const age = parseInt(formData.age);
      if (age > 70) {
        score -= 8;
        issues.push("age_related");
      } else if (age > 55) {
        score -= 5;
      }

      // BMI factor
      const bmi = parseFloat(formData.bmi);
      if (bmi < 18.5) {
        score -= 12;
        issues.push("underweight");
        categorizedSuggestions.immediate.push("Consider consulting a nutritionist to develop a healthy weight gain plan.");
        categorizedSuggestions.longTerm.push("Focus on nutrient-dense foods and strength training exercises.");
      } else if (bmi >= 25 && bmi < 30) {
        score -= 10;
        issues.push("overweight");
        categorizedSuggestions.shortTerm.push("Start with 30 minutes of moderate walking daily.");
        categorizedSuggestions.longTerm.push("Aim for gradual weight loss of 0.5-1kg per week through diet and exercise.");
      } else if (bmi >= 30) {
        score -= 18;
        issues.push("obese");
        categorizedSuggestions.immediate.push("Schedule a consultation with a healthcare provider for a comprehensive evaluation.");
        categorizedSuggestions.shortTerm.push("Begin with low-impact exercises like swimming or walking.");
        categorizedSuggestions.longTerm.push("Consider a structured weight management program.");
      }

      // Lifestyle factors
      if (formData.smoking === "yes") {
        score -= 25;
        issues.push("smoking");
        categorizedSuggestions.immediate.push("Consider joining a smoking cessation program.");
        categorizedSuggestions.longTerm.push("Smoking cessation can significantly reduce your risk of heart disease and lung cancer.");
      } else if (formData.smoking === "occasionally") {
        score -= 10;
        issues.push("occasional_smoking");
        categorizedSuggestions.shortTerm.push("Try to completely eliminate smoking for better health outcomes.");
      }

      if (formData.alcohol === "yes") {
        score -= 15;
        issues.push("alcohol");
        categorizedSuggestions.immediate.push("Limit alcohol consumption to moderate levels (1 drink/day for women, 2 for men).");
      } else if (formData.alcohol === "occasionally") {
        score -= 5;
        issues.push("occasional_alcohol");
      }

      if (formData.exercise === "none") {
        score -= 20;
        issues.push("sedentary");
        categorizedSuggestions.immediate.push("Start with 10-15 minutes of gentle activity and gradually increase.");
        categorizedSuggestions.shortTerm.push("Aim for at least 150 minutes of moderate aerobic activity per week.");
      } else if (formData.exercise === "rarely") {
        score -= 12;
        issues.push("low_activity");
        categorizedSuggestions.shortTerm.push("Try to incorporate more movement into your daily routine.");
      } else if (formData.exercise === "1_2_times") {
        score -= 5;
        issues.push("moderate_activity");
        categorizedSuggestions.shortTerm.push("Consider increasing exercise frequency to 3-4 times per week.");
      }

      if (formData.sleep === "less_than_6") {
        score -= 15;
        issues.push("sleep_deprivation");
        categorizedSuggestions.immediate.push("Establish a consistent sleep schedule, aiming for 7-9 hours.");
        categorizedSuggestions.shortTerm.push("Avoid screens and caffeine at least 2 hours before bedtime.");
      } else if (formData.sleep === "6_7") {
        score -= 8;
        issues.push("insufficient_sleep");
        categorizedSuggestions.shortTerm.push("Try to add 30-60 minutes to your sleep time.");
      }

      if (formData.stress === "high") {
        score -= 12;
        issues.push("high_stress");
        categorizedSuggestions.immediate.push("Practice deep breathing exercises for 5-10 minutes daily.");
        categorizedSuggestions.shortTerm.push("Consider mindfulness meditation or yoga.");
        categorizedSuggestions.longTerm.push("Explore stress management techniques like CBT or counseling.");
      } else if (formData.stress === "moderate") {
        score -= 5;
        issues.push("moderate_stress");
      }

      // Health metrics
      if (formData.bloodPressure === "high") {
        score -= 18;
        issues.push("high_bp");
        categorizedSuggestions.immediate.push("Monitor your blood pressure regularly.");
        categorizedSuggestions.shortTerm.push("Reduce sodium intake and increase potassium-rich foods.");
      } else if (formData.bloodPressure === "slightly_high") {
        score -= 10;
        issues.push("elevated_bp");
        categorizedSuggestions.shortTerm.push("Lifestyle modifications can help normalize blood pressure.");
      }

      if (formData.cholesterol === "high") {
        score -= 15;
        issues.push("high_cholesterol");
        categorizedSuggestions.shortTerm.push("Reduce saturated fat intake and increase fiber-rich foods.");
        categorizedSuggestions.longTerm.push("Consider regular cardiovascular exercise.");
      } else if (formData.cholesterol === "borderline") {
        score -= 7;
        issues.push("borderline_cholesterol");
      }

      if (formData.bloodSugar === "high") {
        score -= 20;
        issues.push("high_blood_sugar");
        categorizedSuggestions.immediate.push("Get tested for diabetes and consult a healthcare provider.");
        categorizedSuggestions.shortTerm.push("Reduce refined sugars and processed carbohydrates.");
      } else if (formData.bloodSugar === "prediabetes") {
        score -= 12;
        issues.push("prediabetes");
        categorizedSuggestions.shortTerm.push("Lifestyle changes can prevent or delay the onset of type 2 diabetes.");
      }

      // Diet factor
      if (formData.diet === "junk_food") {
        score -= 15;
        issues.push("poor_diet");
        categorizedSuggestions.shortTerm.push("Gradually replace junk food with healthier alternatives.");
        categorizedSuggestions.longTerm.push("Focus on a balanced diet with fruits, vegetables, whole grains, and lean proteins.");
      } else if (formData.diet === "non_vegetarian") {
        score -= 2;
      }

      // Symptoms analysis
      if (formData.symptoms.includes("chest_pain")) {
        score -= 15;
        issues.push("chest_pain_symptom");
        categorizedSuggestions.immediate.push("⚠️ Chest pain requires immediate medical attention. Please consult a doctor.");
      }
      if (formData.symptoms.includes("shortness_breath")) {
        score -= 10;
        issues.push("breathing_issues");
        categorizedSuggestions.immediate.push("If breathing difficulties persist, please consult a healthcare provider.");
      }
      if (formData.symptoms.includes("dizziness")) {
        score -= 5;
        issues.push("dizziness");
        categorizedSuggestions.shortTerm.push("Stay hydrated and avoid sudden position changes.");
      }
      if (formData.symptoms.includes("headache") && formData.symptoms.length > 2) {
        score -= 5;
        issues.push("recurring_headaches");
        categorizedSuggestions.shortTerm.push("Track your headaches to identify potential triggers.");
      }

      // General health recommendations
      categorizedSuggestions.longTerm.push("Schedule regular health check-ups at least once a year.");
      categorizedSuggestions.longTerm.push("Stay hydrated by drinking at least 8 glasses of water daily.");
      categorizedSuggestions.shortTerm.push("Limit screen time and take breaks to rest your eyes.");

      // Normalize score
      score = Math.max(0, Math.min(100, score));

      // Combine suggestions
      const allSuggestions = [
        ...categorizedSuggestions.immediate.map(s => ({ text: s, priority: "high" })),
        ...categorizedSuggestions.shortTerm.map(s => ({ text: s, priority: "medium" })),
        ...categorizedSuggestions.longTerm.map(s => ({ text: s, priority: "low" }))
      ];

      setHealthScore(score);
      setDetectedIssues(issues);
      setSuggestions(allSuggestions);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#28a745";
    if (score >= 60) return "#ffc107";
    if (score >= 40) return "#ff9800";
    return "#dc3545";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Great job! Your health metrics are impressive. Keep maintaining your healthy lifestyle!";
    if (score >= 60) return "You're doing well, but there's room for improvement. Check out our suggestions below.";
    if (score >= 40) return "Some areas need attention. Follow these recommendations to improve your health score.";
    return "Your health needs attention. Please consult healthcare professionals for personalized advice.";
  };

  const getDoctorsForIssues = () => {
    const doctorMap = {
      overweight: [
        { name: "Dr. Rajesh Kumar", specialty: "Dietitian & Nutritionist", phone: "+91-9876543210", hospital: "Apollo Hospital", available: "Mon-Fri, 9AM-5PM", rating: 4.8 }
      ],
      obese: [
        { name: "Dr. Priya Sharma", specialty: "Endocrinologist", phone: "+91-9876543211", hospital: "Fortis Hospital", available: "Mon-Sat, 10AM-6PM", rating: 4.9 },
        { name: "Dr. Amit Singh", specialty: "Bariatric Specialist", phone: "+91-9876543220", hospital: "Max Hospital", available: "Tue-Sat, 11AM-7PM", rating: 4.7 }
      ],
      smoking: [
        { name: "Dr. Amit Patel", specialty: "Pulmonologist", phone: "+91-9876543212", hospital: "Max Hospital", available: "Tue-Sat, 11AM-7PM", rating: 4.8 },
        { name: "Dr. Sunita Reddy", specialty: "Respiratory Specialist", phone: "+91-9876543230", hospital: "AIIMS Hospital", available: "Mon-Fri, 8AM-4PM", rating: 4.9 }
      ],
      alcohol: [
        { name: "Dr. Suresh Gupta", specialty: "Hepatologist", phone: "+91-9876543213", hospital: "AIIMS Hospital", available: "Mon-Fri, 8AM-4PM", rating: 4.8 },
        { name: "Dr. Meera Krishnan", specialty: "Addiction Specialist", phone: "+91-9876543240", hospital: "NIMHANS", available: "Wed-Sun, 10AM-6PM", rating: 4.7 }
      ],
      sedentary: [
        { name: "Dr. Neha Singh", specialty: "Physiotherapist", phone: "+91-9876543214", hospital: "Manipal Hospital", available: "Mon-Sat, 9AM-5PM", rating: 4.8 },
        { name: "Dr. Karthik Nair", specialty: "Sports Medicine", phone: "+91-9876543250", hospital: "Sports Medicine Center", available: "Mon-Fri, 10AM-6PM", rating: 4.9 }
      ],
      high_bp: [
        { name: "Dr. Vikram Reddy", specialty: "Cardiologist", phone: "+91-9876543215", hospital: "Narayana Hospital", available: "Wed-Sun, 10AM-6PM", rating: 4.9 },
        { name: "Dr. Lavanya Mohan", specialty: "Hypertension Specialist", phone: "+91-9876543260", hospital: "Apollo Hospital", available: "Mon-Sat, 9AM-5PM", rating: 4.8 }
      ],
      high_cholesterol: [
        { name: "Dr. Anjali Mehta", specialty: "Cardiologist", phone: "+91-9876543216", hospital: "Apollo Hospital", available: "Mon-Fri, 9AM-5PM", rating: 4.8 },
        { name: "Dr. Raghavendra Rao", specialty: "Lipid Specialist", phone: "+91-9876543270", hospital: "Fortis Hospital", available: "Tue-Sat, 11AM-7PM", rating: 4.7 }
      ],
      high_blood_sugar: [
        { name: "Dr. Rahul Joshi", specialty: "Diabetologist", phone: "+91-9876543217", hospital: "Diabetes Care Center", available: "Mon-Sat, 8AM-4PM", rating: 4.9 },
        { name: "Dr. Radhika Iyer", specialty: "Endocrinologist", phone: "+91-9876543280", hospital: "Max Hospital", available: "Mon-Fri, 9AM-5PM", rating: 4.8 }
      ],
      high_stress: [
        { name: "Dr. Pooja Verma", specialty: "Psychiatrist", phone: "+91-9876543218", hospital: "Mind Care Hospital", available: "Tue-Sat, 11AM-7PM", rating: 4.8 },
        { name: "Dr. Aditi Sharma", specialty: "Psychologist & Counselor", phone: "+91-9876543290", hospital: "Mental Wellness Center", available: "Mon-Sat, 10AM-6PM", rating: 4.9 }
      ],
      sleep_deprivation: [
        { name: "Dr. Arun Kumar", specialty: "Sleep Specialist", phone: "+91-9876543219", hospital: "Sleep Well Center", available: "Mon-Fri, 10AM-6PM", rating: 4.8 },
        { name: "Dr. Shreya Menon", specialty: "Neurologist", phone: "+91-9876543300", hospital: "Neuro Care Hospital", available: "Wed-Sun, 9AM-5PM", rating: 4.7 }
      ],
      chest_pain_symptom: [
        { name: "Dr. Manoj Kumar", specialty: "Cardiologist (Emergency)", phone: "+91-9876000000", hospital: "Apollo Emergency", available: "24/7 Emergency", rating: 5.0 },
        { name: "Dr. Deepika Singh", specialty: "Emergency Medicine", phone: "+91-9876000001", hospital: "Fortis Emergency", available: "24/7 Emergency", rating: 4.9 }
      ],
      breathing_issues: [
        { name: "Dr. Arun Prakash", specialty: "Pulmonologist", phone: "+91-9876543310", hospital: "Chest Institute", available: "Mon-Sat, 9AM-5PM", rating: 4.8 }
      ],
      age_related: [
        { name: "Dr. Usha Rani", specialty: "Geriatric Specialist", phone: "+91-9876543320", hospital: "Senior Care Center", available: "Mon-Fri, 10AM-5PM", rating: 4.9 }
      ]
    };

    const doctors = [];
    detectedIssues.forEach(issue => {
      if (doctorMap[issue]) {
        doctors.push(...doctorMap[issue]);
      }
    });

    // Add a general physician as default
    doctors.push(
      { name: "Dr. Sanjay Mishra", specialty: "General Physician", phone: "+91-9876543330", hospital: "City Clinic", available: "Mon-Sat, 8AM-8PM", rating: 4.7 }
    );

    // Remove duplicates
    const uniqueDoctors = doctors.filter((doctor, index, self) =>
      index === self.findIndex((d) => d.phone === doctor.phone)
    );

    return uniqueDoctors;
  };

  const commonSymptoms = [
    { id: "headache", label: "Headache", icon: "🤕" },
    { id: "fatigue", label: "Fatigue", icon: "😴" },
    { id: "chest_pain", label: "Chest Pain", icon: "💔" },
    { id: "shortness_breath", label: "Shortness of Breath", icon: "喘息" },
    { id: "dizziness", label: "Dizziness", icon: "😵" },
    { id: "joint_pain", label: "Joint Pain", icon: "🦴" }
  ];

  const resetForm = () => {
    setStep(1);
    setHealthScore(null);
    setSuggestions([]);
    setDetectedIssues([]);
    setShowDoctors(false);
    setFormData({
      age: "",
      gender: "",
      height: "",
      weight: "",
      bmi: "",
      bmiCategory: "",
      smoking: "",
      alcohol: "",
      exercise: "",
      sleep: "",
      diet: "",
      stress: "",
      bloodPressure: "",
      cholesterol: "",
      bloodSugar: "",
      symptoms: [],
      existingConditions: []
    });
  };

  return (
    <div className="health-prediction">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">Step {step} of 3</span>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="prediction-form fade-in">
          <h2 className="prediction-title">📋 Basic Information</h2>
          <p className="prediction-subtitle">Let's start with some basic details about you</p>
          
          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age"
              min="1"
              max="120"
            />
          </div>

          <div className="form-group">
            <label>Gender *</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Height (cm) *</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="170"
                min="50"
                max="300"
              />
            </div>
            <div className="form-group">
              <label>Weight (kg) *</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="70"
                min="20"
                max="500"
              />
            </div>
          </div>

          {formData.bmi && (
            <div className="bmi-display">
              <div className="bmi-result">
                <span className="bmi-label">Your BMI:</span>
                <span className="bmi-value">{formData.bmi}</span>
                <span className="bmi-category">{formData.bmiCategory}</span>
              </div>
            </div>
          )}

          <button 
            className="btn-primary" 
            onClick={() => setStep(2)}
            disabled={!formData.age || !formData.gender || !formData.height || !formData.weight}
          >
            Next →
          </button>
        </div>
      )}

      {/* Step 2: Lifestyle & Health Metrics */}
      {step === 2 && (
        <div className="prediction-form fade-in">
          <h2 className="prediction-title">🏃 Lifestyle & Health</h2>
          <p className="prediction-subtitle">Tell us about your daily habits and health metrics</p>

          <div className="form-section">
            <h3 className="subsection-title">Lifestyle Habits</h3>
            
            <div className="form-group">
              <label>Smoking</label>
              <select
                value={formData.smoking}
                onChange={(e) => setFormData({ ...formData, smoking: e.target.value })}
              >
                <option value="">Select</option>
                <option value="no">Never</option>
                <option value="occasionally">Occasionally</option>
                <option value="yes">Regularly</option>
              </select>
            </div>

            <div className="form-group">
              <label>Alcohol Consumption</label>
              <select
                value={formData.alcohol}
                onChange={(e) => setFormData({ ...formData, alcohol: e.target.value })}
              >
                <option value="">Select</option>
                <option value="no">Never</option>
                <option value="occasionally">Occasionally</option>
                <option value="yes">Regularly</option>
              </select>
            </div>

            <div className="form-group">
              <label>Exercise Frequency</label>
              <select
                value={formData.exercise}
                onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
              >
                <option value="">Select</option>
                <option value="daily">Daily</option>
                <option value="3_4_times">3-4 times per week</option>
                <option value="1_2_times">1-2 times per week</option>
                <option value="rarely">Rarely</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sleep Duration (per night)</label>
              <select
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
              >
                <option value="">Select</option>
                <option value="more_than_8">More than 8 hours</option>
                <option value="7_8">7-8 hours</option>
                <option value="6_7">6-7 hours</option>
                <option value="less_than_6">Less than 6 hours</option>
              </select>
            </div>

            <div className="form-group">
              <label>Stress Level</label>
              <select
                value={formData.stress}
                onChange={(e) => setFormData({ ...formData, stress: e.target.value })}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Diet Type</label>
              <select
                value={formData.diet}
                onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
              >
                <option value="">Select</option>
                <option value="balanced">Balanced</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
                <option value="junk_food">Fast Food/Junk Food heavy</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="subsection-title">🩺 Health Metrics</h3>
            
            <div className="form-group">
              <label>Blood Pressure</label>
              <select
                value={formData.bloodPressure}
                onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="slightly_high">Slightly High</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cholesterol Level</label>
              <select
                value={formData.cholesterol}
                onChange={(e) => setFormData({ ...formData, cholesterol: e.target.value })}
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="borderline">Borderline High</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Blood Sugar Level</label>
              <select
                value={formData.bloodSugar}
                onChange={(e) => setFormData({ ...formData, bloodSugar: e.target.value })}
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="prediabetes">Prediabetes</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="subsection-title">🤕 Current Symptoms</h3>
            <p className="helper-text">Select any symptoms you're experiencing</p>
            <div className="symptoms-grid">
              {commonSymptoms.map(symptom => (
                <label key={symptom.id} className="symptom-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.symptoms.includes(symptom.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          symptoms: [...formData.symptoms, symptom.id]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          symptoms: formData.symptoms.filter(s => s !== symptom.id)
                        });
                      }
                    }}
                  />
                  <span className="symptom-label">{symptom.icon} {symptom.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="button-row">
            <button className="btn-secondary" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button 
              className="btn-primary" 
              onClick={calculateHealthScore}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner">Analyzing...</span>
              ) : (
                "Analyze My Health"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <div className="prediction-results fade-in">
          <h2 className="prediction-title">🎯 Health Analysis Complete</h2>
          <p className="result-subtitle">Based on your inputs, here's your personalized health assessment</p>

          <div className="score-display">
            <div className="score-container">
              <div className="score-circle" style={{ 
                borderColor: getScoreColor(healthScore),
                boxShadow: `0 0 30px ${getScoreColor(healthScore)}40`
              }}>
                <span className="score-value" style={{ color: getScoreColor(healthScore) }}>
                  {healthScore}
                </span>
                <span className="score-max">/100</span>
              </div>
              <div className="score-info">
                <h3 className="score-label" style={{ color: getScoreColor(healthScore) }}>
                  {getScoreLabel(healthScore)}
                </h3>
                <p className="score-message">{getScoreMessage(healthScore)}</p>
              </div>
            </div>
          </div>

          {detectedIssues.length > 0 && (
            <div className="issues-section">
              <h3>⚠️ Areas of Concern</h3>
              <div className="issues-list">
                {detectedIssues.map((issue, index) => (
                  <div key={index} className="issue-item">
                    {issue.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="suggestions-section">
            <h3>💡 Personalized Suggestions</h3>
            <div className="suggestions-container">
              {suggestions.filter(s => s.priority === "high").length > 0 && (
                <div className="suggestion-category">
                  <h4 className="priority-high">⚡ Immediate Attention</h4>
                  <ul className="suggestions-list">
                    {suggestions.filter(s => s.priority === "high").map((suggestion, index) => (
                      <li key={index}>{suggestion.text}</li>
                    ))}
                  </ul>
                </div>
              )}
              {suggestions.filter(s => s.priority === "medium").length > 0 && (
                <div className="suggestion-category">
                  <h4 className="priority-medium">📅 Short-term Goals</h4>
                  <ul className="suggestions-list">
                    {suggestions.filter(s => s.priority === "medium").map((suggestion, index) => (
                      <li key={index}>{suggestion.text}</li>
                    ))}
                  </ul>
                </div>
              )}
              {suggestions.filter(s => s.priority === "low").length > 0 && (
                <div className="suggestion-category">
                  <h4 className="priority-low">🌱 Long-term Wellness</h4>
                  <ul className="suggestions-list">
                    {suggestions.filter(s => s.priority === "low").map((suggestion, index) => (
                      <li key={index}>{suggestion.text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="btn-primary full-width"
              onClick={() => setShowDoctors(!showDoctors)}
            >
              {showDoctors ? "Hide Recommended Doctors" : "Show Recommended Doctors"}
            </button>
          </div>

          {showDoctors && (
            <div className="doctors-section fade-in">
              <h3>👨‍⚕️ Recommended Healthcare Professionals</h3>
              <p className="helper-text">Specialists based on your health profile</p>
              {getDoctorsForIssues().length > 0 ? (
                <div className="doctors-list">
                  {getDoctorsForIssues().map((doctor, index) => (
                    <div key={index} className="doctor-card">
                      <div className="doctor-header">
                        <div className="doctor-avatar">
                          {doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
                        </div>
                        <div className="doctor-title">
                          <h4>{doctor.name}</h4>
                          <p className="doctor-specialty">{doctor.specialty}</p>
                        </div>
                        <div className="doctor-rating">
                          ⭐ {doctor.rating}
                        </div>
                      </div>
                      <div className="doctor-details">
                        <p className="doctor-hospital">🏥 {doctor.hospital}</p>
                        <p className="doctor-phone">📞 {doctor.phone}</p>
                        <p className="doctor-available">🕐 {doctor.available}</p>
                      </div>
                      <button className="btn-secondary btn-small">
                        Book Appointment
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-doctors">No specific concerns identified. A general physician consultation is recommended for routine check-ups.</p>
              )}
            </div>
          )}

          <div className="button-row action-buttons">
            <button className="btn-secondary" onClick={() => setStep(2)}>
              ← Edit Responses
            </button>
            <button className="btn-primary" onClick={resetForm}>
              Start New Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
