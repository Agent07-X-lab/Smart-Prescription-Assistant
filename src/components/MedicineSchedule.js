import React from "react";

function MedicineSchedule({ medicines }) {
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
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={`${med.name}-${med.dosage}-${med.time}`}>
              <td>
                <strong>{med.name}</strong>
              </td>
              <td>
                <span className="dosage-badge">{med.dosage}</span>
              </td>
              <td>
                <span className="time-badge">
                  {getTimeIcon(med.time)} {med.time}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineSchedule;
