import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Assistant from "./components/Assistant";
import UploadPrescription from "./components/UploadPrescription";
import PatientInfo from "./components/PatientInfo";
import MedicineSchedule from "./components/MedicineSchedule";
import DietPlan from "./components/DietPlan";
import LanguageSelector from "./components/LanguageSelector";
import VoiceButton from "./components/VoiceButton";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [data, setData] = useState(null);

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

  if (screen === "prescription") {
    return (
      <>
        <header className="header">
          <div className="header-content">
            <button onClick={() => navigateTo("home")} className="back-button-header">
              ← Home
            </button>
            <h1>🏥 Smart Prescription Assistant</h1>
            <LanguageSelector />
          </div>
        </header>

        <div className="container">
          <UploadPrescription setData={handlePrescriptionData} />

          {data && (
            <div className="fade-in">
              <PatientInfo info={data.patient} />
              <MedicineSchedule medicines={data.medicines} />
              <DietPlan diet={data.diet} />
              <VoiceButton text={JSON.stringify(data)} />
            </div>
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
            <LanguageSelector />
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
            <LanguageSelector />
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
          <LanguageSelector />
        </div>
      </header>

      <div className="container">
        <Home
          goToAssistant={() => navigateTo("assistant")}
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
        />
      </div>
    </>
  );
}

export default App;
