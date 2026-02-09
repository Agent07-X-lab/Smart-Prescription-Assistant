import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function PatientInfo({ info }) {
  const { t } = useContext(LanguageContext);
  
  if (!info) return null;
  
  return (
    <div className="card">
      <h2>{t("patient_info")}</h2>
      <div className="patient-info-grid">
        <div className="info-item">
          <span className="info-icon"></span>
          <div className="info-content">
            <span className="info-label">{t("name")}</span>
            <span className="info-value">{info.name}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon"></span>
          <div className="info-content">
            <span className="info-label">{t("age")}</span>
            <span className="info-value">{info.age} years</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon"></span>
          <div className="info-content">
            <span className="info-label">Condition</span>
            <span className="info-value">{info.condition}</span>
          </div>
        </div>
        {info.gender && (
          <div className="info-item">
            <span className="info-icon"></span>
            <div className="info-content">
              <span className="info-label">{t("gender")}</span>
              <span className="info-value">{info.gender}</span>
            </div>
          </div>
        )}
        {info.bloodGroup && (
          <div className="info-item">
            <span className="info-icon"></span>
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
