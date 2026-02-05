import React from "react";

function MedicineSchedule({ medicines }) {
  if (!medicines || medicines.length === 0) {
    return (
      <div className="card">
        <h2>💊 Medicine Schedule</h2>
        <p>No medicines scheduled.</p>
      </div>
    );
  }

  const getTimeIcon = (time) => {
    const timeLower = time.toLowerCase();
    if (timeLower.includes("morning")) return "☀️";
    if (timeLower.includes("afternoon") || timeLower.includes("noon")) return "🌤️";
    if (timeLower.includes("night") || timeLower.includes("evening")) return "🌙";
    return "💊";
  };

  return (
    <div className="card">
      <h2>💊 Medicine Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Time</th>
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
                <span className="time-badge">
                  {getTimeIcon(med.time)} {med.time}
                </span>
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
