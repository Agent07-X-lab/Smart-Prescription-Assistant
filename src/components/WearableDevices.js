import React, { useState, useEffect } from "react";
import { getWearableData } from "../data/mockDatabase";

function WearableDevices() {
  // Initialize with data from mock database
  const initialData = getWearableData();
  const [deviceData, setDeviceData] = useState({
    heartRate: initialData.heartRate,
    spO2: initialData.spo2,
    steps: initialData.steps,
    calories: initialData.calories,
    sleepHours: initialData.sleepHours,
  });

  useEffect(() => {
    // Simulate live data updates (small variations)
    const interval = setInterval(() => {
      setDeviceData((prev) => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + Math.floor(Math.random() * 5) - 2)),
        spO2: Math.max(95, Math.min(100, prev.spO2 + Math.floor(Math.random() * 3) - 1)),
        steps: prev.steps + Math.floor(Math.random() * 3),
        calories: prev.calories + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card wearable-devices-card">
      <h2>⌚ Connected Devices</h2>
      <div className="wearable-grid">
        <div className="wearable-item">
          <div className="wearable-icon">❤️</div>
          <div className="wearable-label">Heart Rate</div>
          <div className="wearable-value">{deviceData.heartRate}</div>
          <div className="wearable-unit">bpm</div>
        </div>
        <div className="wearable-item">
          <div className="wearable-icon">🩸</div>
          <div className="wearable-label">SpO2</div>
          <div className="wearable-value">{deviceData.spO2}</div>
          <div className="wearable-unit">%</div>
        </div>
        <div className="wearable-item">
          <div className="wearable-icon">🚶</div>
          <div className="wearable-label">Steps</div>
          <div className="wearable-value">{deviceData.steps.toLocaleString()}</div>
          <div className="wearable-unit">today</div>
        </div>
      </div>
      <div className="wearable-grid">
        <div className="wearable-item">
          <div className="wearable-icon">🔥</div>
          <div className="wearable-label">Calories</div>
          <div className="wearable-value">{deviceData.calories}</div>
          <div className="wearable-unit">kcal</div>
        </div>
        <div className="wearable-item">
          <div className="wearable-icon">😴</div>
          <div className="wearable-label">Sleep</div>
          <div className="wearable-value">{deviceData.sleepHours}</div>
          <div className="wearable-unit">hours</div>
        </div>
      </div>
      <p className="wearable-status">📡 Connected to Smart Watch</p>
      <p className="wearable-updated">Last updated: {new Date(initialData.lastUpdated).toLocaleTimeString()}</p>
    </div>
  );
}

export default WearableDevices;
