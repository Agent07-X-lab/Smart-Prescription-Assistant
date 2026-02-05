import React, { useState, useContext } from "react";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Assistant from "./components/Assistant";
import CameraPrescriptionScan from "./components/CameraPrescriptionScan";
import Reminders from "./components/Reminders";
import HealthDashboard from "./components/HealthDashboard";
import HealthLocker from "./components/HealthLocker";
import VoiceOnlyMode from "./components/VoiceOnlyMode";
import UploadPrescription from "./components/UploadPrescription";
import PatientInfo from "./components/PatientInfo";
import MedicineSchedule from "./components/MedicineSchedule";
import DietPlan from "./components/DietPlan";
import HealthRiskAlerts from "./components/HealthRiskAlerts";
import DrugInteractionWarning from "./components/DrugInteractionWarning";
import ShareWithDoctor from "./components/ShareWithDoctor";
import LanguageSelector from "./components/LanguageSelector";
import ElderlyModeToggle from "./components/ElderlyModeToggle";
import DarkModeToggle from "./components/DarkModeToggle";
import VoiceButton from "./components/VoiceButton";
import { ElderlyModeContext } from "./contexts/ElderlyModeContext";
import "./App.css";

function App() {
  const { elderlyMode } = useContext(ElderlyModeContext);
  const [screen, setScreen] = useState("welcome");
  const [data, setData] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

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

  if (screen === "assistant") {
    return <Assistant onBack={() => navigateTo("home")} />;
  }

  if (screen === "camera-scan") {
    return (
      <CameraPrescriptionScan
        setData={handlePrescriptionData}
        onBack={() => navigateTo("home")}
      />
    );
  }

  if (screen === "reminders") {
    return <Reminders onBack={() => navigateTo("home")} />;
  }

  if (screen === "dashboard") {
    return <HealthDashboard onBack={() => navigateTo("home")} />;
  }

  if (screen === "health-locker") {
    return <HealthLocker onBack={() => navigateTo("home")} />;
  }

  if (screen === "voice-only") {
    return <VoiceOnlyMode onBack={() => navigateTo("home")} />;
  }

  if (screen === "prescription") {
    return (
      <>
        <header className="header">
          <div className="header-content">
            <button onClick={() => navigateTo("home")} className="back-button-header">
              ← Home
            </button>
            <h1>🏥 Smart Prescription Assistant</h1>
            <div className="header-controls">
              <DarkModeToggle />
              <ElderlyModeToggle />
              <LanguageSelector />
            </div>
          </div>
        </header>

        <div className="container">
          <UploadPrescription setData={handlePrescriptionData} />

          {data && (
            <div className="fade-in">
              <PatientInfo info={data.patient} />
              <DrugInteractionWarning medicines={data.medicines} />
              <MedicineSchedule medicines={data.medicines} />
              <DietPlan diet={data.diet} />
              <HealthRiskAlerts medicines={data.medicines} condition={data.patient?.condition} />
              <div className="action-buttons-row">
                <button onClick={() => setShowShareModal(true)} className="share-doctor-button">
                  📤 Share Report with Doctor
                </button>
                <VoiceButton text={JSON.stringify(data)} />
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
        <header className="header">
          <div className="header-content">
            <button onClick={() => navigateTo("home")} className="back-button-header">
              ← Home
            </button>
            <h1>💊 Medicine Schedule</h1>
            <div className="header-controls">
              <DarkModeToggle />
              <ElderlyModeToggle />
              <LanguageSelector />
            </div>
          </div>
        </header>

        <div className="container">
          <MedicineSchedule medicines={data.medicines} />
        </div>
      </>
    );
  }

  if (screen === "diet" && data) {
    return (
      <>
        <header className="header">
          <div className="header-content">
            <button onClick={() => navigateTo("home")} className="back-button-header">
              ← Home
            </button>
            <h1>🥗 Diet Plan</h1>
            <div className="header-controls">
              <DarkModeToggle />
              <ElderlyModeToggle />
              <LanguageSelector />
            </div>
          </div>
        </header>

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
          <h1>🏥 Smart Prescription Assistant</h1>
          <div className="header-controls">
            <ElderlyModeToggle />
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
        />
      </div>
    </>
  );
}

export default App;
