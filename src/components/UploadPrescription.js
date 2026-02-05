import React, { useState } from "react";

function UploadPrescription({ setData }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleUpload = (file) => {
    if (!file) return;
    setFileName(file.name);

    // TEMPORARY MOCK DATA (until backend is ready)
    const mockResponse = {
      patient: { name: "Rahul Sharma", age: 45, condition: "Diabetes" },
      medicines: [
        { name: "Metformin", dosage: "500mg", time: "Morning" },
        { name: "Insulin", dosage: "10 units", time: "Night" },
      ],
      diet: {
        eat: ["Green vegetables", "Whole grains", "Fruits"],
        avoid: ["Sugar", "Fried food", "Soft drinks"],
      },
    };

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
