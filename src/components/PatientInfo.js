import React from "react";

function PatientInfo({ info }) {
  return (
    <div className="card">
      <h2>👤 Patient Details</h2>
      <div className="patient-info-grid">
        <div className="info-item">
          <span className="info-icon">👨‍⚕️</span>
          <div className="info-content">
            <span className="info-label">Name</span>
            <span className="info-value">{info.name}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🎂</span>
          <div className="info-content">
            <span className="info-label">Age</span>
            <span className="info-value">{info.age} years</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🏥</span>
          <div className="info-content">
            <span className="info-label">Condition</span>
            <span className="info-value">{info.condition}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
