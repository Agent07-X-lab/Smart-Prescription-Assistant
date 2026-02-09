import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import logo from "../assets/logo.svg";

export default function Welcome({ onStart }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="welcome-screen">
      <div className="welcome-pill-bg"></div>
      <div className="welcome-content">
        <div className="welcome-logo">
          <img src={logo} alt="Sahaay Logo" className="welcome-logo-icon" />
          <h2 className="welcome-logo-text">Sahaay</h2>
        </div>
        
        <button onClick={onStart} className="welcome-button">
          {t("get_started")}
        </button>

        <div className="welcome-features">
          <div className="welcome-feature">
            <span>🏥</span>
            <span>{t("upload_prescription")}</span>
          </div>
          <div className="welcome-feature">
            <span>💊</span>
            <span>{t("medicine_schedule")}</span>
          </div>
          <div className="welcome-feature">
            <span>🗣️</span>
            <span>{t("voice_assistant")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
