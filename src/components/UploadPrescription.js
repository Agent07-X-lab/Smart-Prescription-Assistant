import React, { useState } from "react";
import { getPatientInfo, getMedicines, getDietPlan } from "../data/mockDatabase";

function UploadPrescription({ setData }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleUpload = (file) => {
    if (!file) return;
    setFileName(file.name);

    // Use mock database data (simulating backend response)
    const patientInfo = getPatientInfo();
    const medicines = getMedicines();
    const dietPlan = getDietPlan();

    const mockResponse = {
      patient: {
        name: patientInfo.name,
        age: patientInfo.age,
        condition: patientInfo.condition,
        gender: patientInfo.gender,
        bloodGroup: patientInfo.bloodGroup
      },
      medicines: medicines.map(med => ({
        name: med.name,
        dosage: med.dosage,
        time: med.time,
        frequency: med.frequency,
        duration: med.duration,
        instructions: med.instructions
      })),
      diet: {
        eat: dietPlan.eat,
        avoid: dietPlan.avoid,
        mealPlan: dietPlan.mealPlan,
        tips: dietPlan.tips
      },
    };

    // Simulate processing delay
    setTimeout(() => setData(mockResponse), 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleUpload(file);
  };

  return (
    <div className="card">
      <h2>📄 Upload Prescription</h2>
      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">☁️</div>
        <p className="upload-text">
          {fileName ? (
            <>
              <strong>✓ {fileName}</strong>
              <br />
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Processing...
              </span>
            </>
          ) : (
            <>
              Drag & drop your prescription here
              <br />
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                or click to browse
              </span>
            </>
          )}
        </p>
        <label htmlFor="file-upload" className="upload-button">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default UploadPrescription;
