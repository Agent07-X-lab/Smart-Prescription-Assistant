import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Home({ 
  goToAssistant, 
  goToPrescription, 
  goToCameraScan,
  goToMedicines, 
  goToDiet,
  goToReminders,
  goToDashboard,
  goToHealthLocker,
  goToVoiceOnly,
  goToHealthPrediction,
  goToDoctorAppointment
 }) {
  const { t } = useContext(LanguageContext);
    
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            {t("home_hero_title")}
          </h1>
          <p className="home-hero-subtitle">
            {t("home_hero_subtitle")}
          </p>
          <div className="home-hero-buttons">
            <button
              onClick={goToPrescription}
              className="home-hero-button primary"
            >
              📤 {t("upload_prescription")}
            </button>
            <button
              onClick={scrollToFeatures}
              className="home-hero-button secondary"
            >
              ✨ {t("explore_features")}
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <h2 className="home-title">Quick Actions</h2>
      <div className="quick-actions">
        <div className="quick-action-card" onClick={goToCameraScan}>
          <span className="quick-action-icon">📷</span>
          <span className="quick-action-text">{t("scan_prescription")}</span>
        </div>
        <div className="quick-action-card" onClick={goToMedicines}>
          <span className="quick-action-icon">💊</span>
          <span className="quick-action-text">{t("medicine_schedule")}</span>
        </div>
        <div className="quick-action-card" onClick={goToDiet}>
          <span className="quick-action-icon">🥗</span>
          <span className="quick-action-text">{t("diet_plan")}</span>
        </div>
        <div className="quick-action-card" onClick={goToReminders}>
          <span className="quick-action-icon">🔔</span>
          <span className="quick-action-text">{t("smart_reminders")}</span>
        </div>
        <div className="quick-action-card" onClick={goToDashboard}>
          <span className="quick-action-icon">📊</span>
          <span className="quick-action-text">{t("health_dashboard")}</span>
        </div>
        <div className="quick-action-card" onClick={goToVoiceOnly}>
          <span className="quick-action-icon">🎤</span>
          <span className="quick-action-text">{t("voice_assistant")}</span>
        </div>
        <div className="quick-action-card" onClick={goToHealthPrediction}>
          <span className="quick-action-icon">🔮</span>
          <span className="quick-action-text">AI Health Prediction</span>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="features-title">
          {t("powerful_features")}
        </h2>

        <div className="features-grid">
          <div className="feature-card" onClick={goToAssistant}>
            <div className="feature-icon">🤖</div>
            <h3 className="feature-card-title">Health Assistant</h3>
            <p className="feature-card-desc">
              Get personalized health analysis and recommendations based on your lifestyle and health metrics.
            </p>
          </div>

          <div className="feature-card" onClick={goToDoctorAppointment}>
            <div className="feature-icon">👨‍⚕️</div>
            <h3 className="feature-card-title">Doctor Appointments</h3>
            <p className="feature-card-desc">
              Book appointments with top specialists, manage your schedule, and get healthcare on your terms.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⌚</div>
            <h3 className="feature-card-title">{t("connected_devices")}</h3>
            <p className="feature-card-desc">
              {t("connected_devices_desc")}
            </p>
          </div>

          <div className="feature-card" onClick={goToCameraScan}>
            <div className="feature-icon">📱</div>
            <h3 className="feature-card-title">{t("scan_prescription")}</h3>
            <p className="feature-card-desc">
              {t("scan_prescription_desc")}
            </p>
          </div>

          <div className="feature-card" onClick={goToHealthLocker}>
            <div className="feature-icon">📁</div>
            <h3 className="feature-card-title">{t("health_locker")}</h3>
            <p className="feature-card-desc">
              {t("health_locker_desc")}
            </p>
          </div>

          <div className="feature-card" onClick={goToReminders}>
            <div className="feature-icon">⏰</div>
            <h3 className="feature-card-title">{t("smart_reminders")}</h3>
            <p className="feature-card-desc">
              {t("smart_reminders_desc")}
            </p>
          </div>

          <div className="feature-card" onClick={goToVoiceOnly}>
            <div className="feature-icon">🗣️</div>
            <h3 className="feature-card-title">{t("voice_assistant")}</h3>
            <p className="feature-card-desc">
              {t("voice_assistant_desc")}
            </p>
          </div>

          <div className="feature-card" onClick={goToMedicines}>
            <div className="feature-icon">💊</div>
            <h3 className="feature-card-title">{t("medicine_schedule")}</h3>
            <p className="feature-card-desc">
              {t("medicine_schedule_desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
