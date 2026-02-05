import React from "react";

export default function Welcome({ onStart }) {
  return (
    <div className="welcome-screen">
      <div className="pill-bg"></div>
      <div className="welcome-content">
        <div className="welcome-icon">🏥</div>
        <h1>Your Digital Healthcare Assistant</h1>
        <p>Upload prescriptions, track medicines, and get personalized health guidance</p>
        <button onClick={onStart} className="welcome-button">
          Get Started
        </button>
      </div>
    </div>
  );
}
