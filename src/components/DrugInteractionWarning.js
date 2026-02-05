import React from "react";
import { getMedicines } from "../data/mockDatabase";

function DrugInteractionWarning({ medicines: propMedicines }) {
  // Use mock database medicines if prop not provided
  const medicines = propMedicines || getMedicines();

  // Mock drug interaction detection using mock database
  const checkInteractions = () => {
    if (!medicines || medicines.length < 2) return null;

    const medicineNames = medicines.map((m) => m.name.toLowerCase());
    const medicineObjects = medicines.map((m) => ({ name: m.name, dosage: m.dosage }));

    // Simple rule-based detection
    const interactions = [];

    // Metformin + Insulin interaction
    if (
      medicineNames.some((m) => m.includes("metformin")) &&
      medicineNames.some((m) => m.includes("insulin"))
    ) {
      const metformin = medicineObjects.find(m => m.name.toLowerCase().includes("metformin"));
      const insulin = medicineObjects.find(m => m.name.toLowerCase().includes("insulin"));
      
      interactions.push({
        medicines: [metformin.name, insulin.name],
        severity: "moderate",
        message: "May increase risk of hypoglycemia. Monitor blood sugar closely. Take glucose tablets if needed.",
        recommendation: "Space out doses and monitor blood sugar levels regularly."
      });
    }

    // Aspirin + Warfarin interaction
    if (
      medicineNames.some((m) => m.includes("aspirin")) &&
      medicineNames.some((m) => m.includes("warfarin"))
    ) {
      const aspirin = medicineObjects.find(m => m.name.toLowerCase().includes("aspirin"));
      const warfarin = medicineObjects.find(m => m.name.toLowerCase().includes("warfarin"));
      
      interactions.push({
        medicines: [aspirin.name, warfarin.name],
        severity: "high",
        message: "Increased bleeding risk. These medications together can cause excessive bleeding.",
        recommendation: "Consult your doctor immediately before taking these together."
      });
    }

    // Aspirin + Metformin (stomach irritation)
    if (
      medicineNames.some((m) => m.includes("aspirin")) &&
      medicineNames.some((m) => m.includes("metformin"))
    ) {
      const aspirin = medicineObjects.find(m => m.name.toLowerCase().includes("aspirin"));
      const metformin = medicineObjects.find(m => m.name.toLowerCase().includes("metformin"));
      
      interactions.push({
        medicines: [aspirin.name, metformin.name],
        severity: "moderate",
        message: "Both can cause stomach irritation. Take with food and monitor for gastrointestinal symptoms.",
        recommendation: "Take with meals and plenty of water."
      });
    }

    // Multiple medicines general warning
    if (medicines.length >= 3) {
      interactions.push({
        medicines: medicines.map(m => m.name),
        severity: "info",
        message: `You are taking ${medicines.length} medications. Ensure proper timing and spacing between doses.`,
        recommendation: "Follow your doctor's schedule strictly and keep a medication log."
      });
    }

    return interactions.length > 0 ? interactions : null;
  };

  const interactions = checkInteractions();

  if (!interactions) return null;

  return (
    <div className="card drug-interaction-card">
      <h2>⚠️ Possible Drug Interaction</h2>
      {interactions.map((interaction, index) => (
        <div key={index} className={`interaction-alert interaction-${interaction.severity}`}>
          <div className="interaction-medicines">
            {Array.isArray(interaction.medicines) 
              ? interaction.medicines.join(" + ")
              : interaction.medicines}
          </div>
          <p className="interaction-message">{interaction.message}</p>
          {interaction.recommendation && (
            <p className="interaction-recommendation">
              <strong>💡 Recommendation:</strong> {interaction.recommendation}
            </p>
          )}
          <div className="interaction-action">
            <strong>⚠️ Consult your doctor before taking these together</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DrugInteractionWarning;
