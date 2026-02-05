import React from "react";
import { getPatientInfo, getMedicines } from "../data/mockDatabase";

function HealthRiskAlerts({ medicines: propMedicines, condition: propCondition }) {
  // Use mock database data if props not provided
  const patientInfo = getPatientInfo();
  const medicines = propMedicines || getMedicines();
  const condition = propCondition || patientInfo.condition;

  // Mock AI logic for health risk detection using mock database
  const getRiskAlerts = () => {
    const alerts = [];

    if (condition?.toLowerCase().includes("diabetes")) {
      alerts.push({
        type: "warning",
        icon: "⚠️",
        title: "High Blood Sugar Risk",
        message: "Monitor your blood sugar levels regularly while taking these medications. Check fasting and post-meal levels daily.",
      });
    }

    medicines?.forEach((med) => {
      const medName = med.name.toLowerCase();
      
      if (medName.includes("metformin")) {
        alerts.push({
          type: "info",
          icon: "💊",
          title: "Metformin Side Effects",
          message: med.sideEffects?.join(', ') || "May cause drowsiness or nausea. Take with food to reduce stomach upset.",
        });
      }

      if (medName.includes("insulin")) {
        alerts.push({
          type: "warning",
          icon: "🩸",
          title: "Hypoglycemia Risk",
          message: med.sideEffects?.join(', ') || "Keep glucose tablets handy. Watch for signs of low blood sugar like dizziness or sweating.",
        });
      }

      if (medName.includes("aspirin")) {
        alerts.push({
          type: "info",
          icon: "💊",
          title: "Aspirin Precautions",
          message: med.sideEffects?.join(', ') || "May cause stomach irritation. Take with food and plenty of water.",
        });
      }
    });

    if (condition?.toLowerCase().includes("hypertension") || condition?.toLowerCase().includes("blood pressure")) {
      alerts.push({
        type: "warning",
        icon: "🧂",
        title: "Salt Intake Warning",
        message: "Limit salt intake to help control blood pressure. Avoid processed foods and maintain a low-sodium diet.",
      });
    }

    // Check for multiple medicines (drug interaction risk)
    if (medicines && medicines.length > 1) {
      alerts.push({
        type: "info",
        icon: "🔍",
        title: "Multiple Medications",
        message: `You are taking ${medicines.length} medications. Ensure proper spacing between doses and consult your doctor about any interactions.`,
      });
    }

    return alerts;
  };

  const alerts = getRiskAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="card health-risk-card">
      <h2>⚠️ Health Risk Insights</h2>
      <div className="risk-alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`risk-alert risk-alert-${alert.type}`}>
            <div className="risk-alert-icon">{alert.icon}</div>
            <div className="risk-alert-content">
              <h3>{alert.title}</h3>
              <p>{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthRiskAlerts;
