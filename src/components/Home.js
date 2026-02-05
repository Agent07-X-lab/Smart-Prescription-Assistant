import React from "react";

export default function Home({ 
  goToAssistant, 
  goToPrescription, 
  goToCameraScan,
  goToMedicines, 
  goToDiet,
  goToReminders 
}) {
  return (
    <div className="home">
      <h2 className="home-title">Welcome Back 👋</h2>
      <input 
        className="search" 
        placeholder="🔍 Find a doctor or service" 
        type="text"
      />

      <div className="appointment-card">
        <h3>📅 Upcoming Appointments</h3>
        <p>Dr. Darius Kline — Tomorrow 9:30 AM</p>
      </div>

      <div className="grid">
        <div className="mini-card" onClick={goToAssistant}>
          <div className="mini-card-icon">💬</div>
          <div className="mini-card-text">AI Assistant</div>
        </div>
        <div className="mini-card" onClick={goToCameraScan}>
          <div className="mini-card-icon">📷</div>
          <div className="mini-card-text">Scan Prescription</div>
        </div>
        <div className="mini-card" onClick={goToPrescription}>
          <div className="mini-card-icon">📄</div>
          <div className="mini-card-text">Upload Prescription</div>
        </div>
        <div className="mini-card" onClick={goToMedicines}>
          <div className="mini-card-icon">💊</div>
          <div className="mini-card-text">Medicines</div>
        </div>
        <div className="mini-card" onClick={goToDiet}>
          <div className="mini-card-icon">🥗</div>
          <div className="mini-card-text">Diet Plan</div>
        </div>
        <div className="mini-card" onClick={goToReminders}>
          <div className="mini-card-icon">📅</div>
          <div className="mini-card-text">Reminders</div>
        </div>
      </div>
    </div>
  );
}
