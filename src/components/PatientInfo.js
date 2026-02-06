import React from "react";

function PatientInfo({ info }) {
  if (!info) return null;
  
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
        {info.gender && (
          <div className="info-item">
            <span className="info-icon">⚧️</span>
            <div className="info-content">
              <span className="info-label">Gender</span>
              <span className="info-value">{info.gender}</span>
            </div>
          </div>
        )}
        {info.bloodGroup && (
          <div className="info-item">
            <span className="info-icon">🩸</span>
            <div className="info-content">
              <span className="info-label">Blood Group</span>
              <span className="info-value">{info.bloodGroup}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientInfo;
