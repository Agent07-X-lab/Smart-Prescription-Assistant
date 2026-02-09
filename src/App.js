import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "./contexts/LanguageContext";
import { ElderlyModeContext } from "./contexts/ElderlyModeContext";
import { getMedicines } from "./data/mockDatabase";
import logo from "./assets/logo.svg";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Assistant from "./components/Assistant";
import CameraPrescriptionScan from "./components/CameraPrescriptionScan";
import Reminders from "./components/Reminders";
import HealthDashboard from "./components/HealthDashboard";
import HealthLocker from "./components/HealthLocker";
import HealthPrediction from "./components/HealthPrediction";
import VoiceOnlyMode from "./components/VoiceOnlyMode";
import UploadPrescription from "./components/UploadPrescription";
import PatientInfo from "./components/PatientInfo";
import MedicineSchedule from "./components/MedicineSchedule";
import DietPlan from "./components/DietPlan";
import HealthRiskAlerts from "./components/HealthRiskAlerts";
import DrugInteractionWarning from "./components/DrugInteractionWarning";
import ShareWithDoctor from "./components/ShareWithDoctor";
import DoctorAppointment from "./components/DoctorAppointment";
import LanguageSelector from "./components/LanguageSelector";
import ElderlyModeToggle from "./components/ElderlyModeToggle";
import DarkModeToggle from "./components/DarkModeToggle";
import VoiceButton from "./components/VoiceButton";
import "./App.css";

function App() {
  const { elderlyMode } = useContext(ElderlyModeContext);
  const { language } = useContext(LanguageContext);
  const [screen, setScreen] = useState("welcome");
  const [data, setData] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Update medicines when language changes
  useEffect(() => {
    if (data && data.medicines) {
      const translatedMedicines = getMedicines(language);
      setData(prev => ({
        ...prev,
        medicines: translatedMedicines
      }));
    }
  }, [language]);

  // Apply elderly mode class to body
  React.useEffect(() => {
    if (elderlyMode) {
      document.body.classList.add("elderly-mode");
    } else {
      document.body.classList.remove("elderly-mode");
    }
    return () => {
      document.body.classList.remove("elderly-mode");
    };
  }, [elderlyMode]);

  const navigateTo = (screenName) => {
    setScreen(screenName);
  };

  const handlePrescriptionData = (prescriptionData) => {
    setData(prescriptionData);
    setScreen("prescription");
  };

  // Render based on current screen
  if (screen === "welcome") {
    return <Welcome onStart={() => navigateTo("home")} />;
  }

  // Header component for all pages
  const renderHeader = (title, showBack = false) => (
    <header className="header">
      <div className="header-content">
        {showBack ? (
          <button onClick={() => navigateTo("home")} className="back-button-header">
            ← Back
          </button>
        ) : (
          <div className="header-logo">
            <img src={logo} alt="Sahaay Logo" className="logo-icon" />
            <h1>Sahaay</h1>
          </div>
        )}
        <div className="header-controls">
          <div className="toggle-row">
            <DarkModeToggle />
            <ElderlyModeToggle />
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );

  if (screen === "assistant") {
    return (
      <>
        {renderHeader("AI Assistant", true)}
        <div className="container">
          <Assistant onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "camera-scan") {
    return (
      <>
        {renderHeader("Scan Prescription", true)}
        <div className="container">
          <CameraPrescriptionScan
            setData={handlePrescriptionData}
            onBack={() => navigateTo("home")}
          />
        </div>
      </>
    );
  }

  if (screen === "reminders") {
    return (
      <>
        {renderHeader("Smart Reminders", true)}
        <div className="container">
          <Reminders onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "dashboard") {
    return (
      <>
        {renderHeader("Health Dashboard", true)}
        <div className="container">
          <HealthDashboard onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "health-locker") {
    return (
      <>
        {renderHeader("Health Locker", true)}
        <div className="container">
          <HealthLocker onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "health-prediction") {
    return (
      <>
        {renderHeader("AI Health Prediction", true)}
        <div className="container">
          <HealthPrediction onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "doctor-appointment") {
    return (
      <>
        {renderHeader("Doctor Appointments", true)}
        <div className="container">
          <DoctorAppointment onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "voice-only") {
    return (
      <>
        {renderHeader("Voice Mode", true)}
        <div className="container">
          <VoiceOnlyMode onBack={() => navigateTo("home")} />
        </div>
      </>
    );
  }

  if (screen === "prescription") {
    return (
      <>
        {renderHeader("Your Prescription", true)}
        <div className="container">
          <UploadPrescription setData={handlePrescriptionData} />

          {data && (
            <div className="fade-in">
              <PatientInfo info={data.patient} />
              {/* Only show complex info when NOT in elderly mode */}
              {!elderlyMode && (
                <>
                  <DrugInteractionWarning medicines={data.medicines} />
                  <HealthRiskAlerts medicines={data.medicines} condition={data.patient?.condition} />
                  <DietPlan diet={data.diet} />
                </>
              )}
              {/* Always show medicine schedule - this is essential */}
              <MedicineSchedule medicines={data.medicines} />
              {/* Show simplified action buttons in elderly mode */}
              <div className="action-buttons-row">
                {elderlyMode ? (
                  <button onClick={() => setShowShareModal(true)} className="share-doctor-button">
                    📤 Share with Doctor
                  </button>
                ) : (
                  <>
                    <button onClick={() => setShowShareModal(true)} className="share-doctor-button">
                      📤 Share Report with Doctor
                    </button>
                    <VoiceButton text={JSON.stringify(data)} />
                  </>
                )}
              </div>
            </div>
          )}
          
          {showShareModal && (
            <ShareWithDoctor data={data} onClose={() => setShowShareModal(false)} />
          )}
        </div>
      </>
    );
  }

  if (screen === "medicines" && data) {
    return (
      <>
        {renderHeader("Medicine Schedule", true)}
        <div className="container">
          <MedicineSchedule medicines={data.medicines} />
        </div>
      </>
    );
  }

  if (screen === "diet" && data) {
    return (
      <>
        {renderHeader("Diet Plan", true)}
        <div className="container">
          <DietPlan diet={data.diet} />
        </div>
      </>
    );
  }

  // Home screen (default)
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <img src={logo} alt="Sahaay Logo" className="logo-icon" />
            <h1>Sahaay</h1>
          </div>
          <div className="header-controls">
            <div className="toggle-row">
              <DarkModeToggle />
              <ElderlyModeToggle />
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="container">
        <Home
          goToAssistant={() => navigateTo("assistant")}
          goToCameraScan={() => navigateTo("camera-scan")}
          goToPrescription={() => navigateTo("prescription")}
          goToMedicines={() => {
            if (data) {
              navigateTo("medicines");
            } else {
              navigateTo("prescription");
            }
          }}
          goToDiet={() => {
            if (data) {
              navigateTo("diet");
            } else {
              navigateTo("prescription");
            }
          }}
          goToReminders={() => navigateTo("reminders")}
          goToDashboard={() => navigateTo("dashboard")}
          goToHealthLocker={() => navigateTo("health-locker")}
          goToVoiceOnly={() => navigateTo("voice-only")}
          goToHealthPrediction={() => navigateTo("health-prediction")}
          goToDoctorAppointment={() => navigateTo("doctor-appointment")}
        />
      </div>
    </>
  );
}

export default App;
