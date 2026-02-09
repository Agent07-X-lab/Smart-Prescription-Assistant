import React, { useState, useContext } from "react";
import { getHealthReports } from "../data/mockDatabase";
import { LanguageContext } from "../contexts/LanguageContext";

function HealthLocker({ onBack }) {
  const { t } = useContext(LanguageContext);
  // Get health reports from mock database
  const [documents] = useState(getHealthReports());

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Prescription", "Lab Report", "X-Ray", "Medical History"];

  const filteredDocuments =
    selectedCategory === "All"
      ? documents
      : documents.filter((doc) => doc.type === selectedCategory);

  return (
    <div className="health-locker-screen">
      <div className="card">
        <div className="locker-header">
          <button onClick={onBack} className="back-button-header">{t("back")}</button>
          <h2>{t("health_locker_title")}</h2>
        </div>

        <div className="locker-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-button ${selectedCategory === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="documents-list">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="document-item">
              <div className="document-icon">{doc.icon}</div>
              <div className="document-info">
                <div className="document-name">{doc.name}</div>
                <div className="document-meta">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>
              <button className="document-action"></button>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"></div>
            <p>{t("no_documents")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthLocker;
