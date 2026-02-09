import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function CameraPrescriptionScan({ setData, onBack }) {
  const { t } = useContext(LanguageContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCameraCapture = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsProcessing(true);

      // Mock processing animation
      setTimeout(() => {
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
        setIsProcessing(false);
        setData(mockResponse);
      }, 3000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="camera-scan-screen">
      <div className="card">
        <div className="camera-header">
          <button onClick={onBack} className="back-button-header">{t("back")}</button>
          <h2>{t("camera_scan")}</h2>
        </div>

        {!imagePreview ? (
          <div className="camera-upload-area">
            <div className="camera-icon"></div>
            <p className="camera-instructions">
              Position your prescription clearly in the camera view
            </p>
            <label htmlFor="camera-input" className="camera-button">
              Open Camera
            </label>
            <input
              id="camera-input"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div className="camera-preview-container">
            <div className="image-preview-wrapper">
              <img src={imagePreview} alt="Prescription preview" className="preview-image" />
            </div>

            {isProcessing ? (
              <div className="processing-container">
                <div className="loading-spinner"></div>
                <p className="processing-text">{t("scanning")}</p>
                <p className="processing-subtext">Analyzing medicines and dosage</p>
              </div>
            ) : (
              <div className="success-message">
                <div className="success-icon"></div>
                <p>{t("scan_complete")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraPrescriptionScan;
