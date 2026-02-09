import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function MedicineSchedule({ medicines }) {
  const { t } = useContext(LanguageContext);
  
  if (!medicines || medicines.length === 0) {
    return (
      <div className="card">
        <h2>{t("medicine_schedule_title")}</h2>
        <p>{t("no_medicines")}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{t("medicine_schedule_title")}</h2>
      <table>
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>Dosage</th>
            <th>{t("time")}</th>
            {medicines.some(m => m.frequency) && <th>Frequency</th>}
            {medicines.some(m => m.duration) && <th>Duration</th>}
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, index) => (
            <tr key={`${med.name}-${med.dosage}-${med.time}-${index}`}>
              <td>
                <strong>{med.name}</strong>
                {med.instructions && (
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                    {med.instructions}
                  </div>
                )}
              </td>
              <td>
                <span className="dosage-badge">{med.dosage}</span>
              </td>
              <td>
                <span className="time-badge">{med.time}</span>
              </td>
              {medicines.some(m => m.frequency) && (
                <td>{med.frequency || "-"}</td>
              )}
              {medicines.some(m => m.duration) && (
                <td>{med.duration || "-"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineSchedule;
