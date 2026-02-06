import React, { useContext } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { getHealthMetrics } from "../data/mockDatabase";

function HealthDashboard({ onBack }) {
  const { darkMode } = useContext(DarkModeContext);
  
  // Get data from mock database
  const healthMetrics = getHealthMetrics();
  
  // Chart colors based on theme
  const gridColor = darkMode ? "rgba(78, 205, 196, 0.2)" : "#E1E8ED";
  const textColor = darkMode ? "#B8D4E3" : "#5A6B73";
  const tooltipBg = darkMode ? "#1e2a32" : "white";
  const tooltipBorder = darkMode ? "#2a3f4a" : "#E1E8ED";
  const tooltipText = darkMode ? "#E6F1F5" : "#2F3E46";
  
  // Use data from mock database
  const bloodPressureData = healthMetrics.bloodPressure;
  const bloodSugarData = healthMetrics.bloodSugar;

  const adherenceData = [
    { name: "Taken", value: healthMetrics.medicineAdherence.taken, color: "#2A9D8F" },
    { name: "Missed", value: healthMetrics.medicineAdherence.missed, color: "#E76F51" },
  ];

  const dietComplianceData = [
    { name: "Compliant", value: healthMetrics.dietCompliance.compliant, color: "#A8D5BA" },
    { name: "Non-Compliant", value: healthMetrics.dietCompliance.nonCompliant, color: "#E76F51" },
  ];

  return (
    <div className="health-dashboard-screen">
      <div className="card">
        <div className="dashboard-header">
          <button onClick={onBack} className="back-button-header">← Back</button>
          <h2>📊 Personal Health Dashboard</h2>
        </div>

        <div className="dashboard-grid">
          {/* Blood Pressure Chart */}
          <div className="dashboard-card">
            <h3>🩺 Blood Pressure Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" stroke={textColor} fontSize={12} />
                <YAxis stroke={textColor} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "8px",
                    color: tooltipText,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="systolic"
                  stroke="#2A9D8F"
                  fill="#2A9D8F"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#3A86B7"
                  fill="#3A86B7"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color" style={{ background: "#2A9D8F" }}></span>
                Systolic
              </span>
              <span className="legend-item">
                <span className="legend-color" style={{ background: "#3A86B7" }}></span>
                Diastolic
              </span>
            </div>
          </div>

          {/* Blood Sugar Chart */}
          <div className="dashboard-card">
            <h3>🩸 Blood Sugar Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={bloodSugarData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" stroke={textColor} fontSize={12} />
                <YAxis stroke={textColor} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "8px",
                    color: tooltipText,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="fasting"
                  stroke="#2A9D8F"
                  strokeWidth={2}
                  dot={{ fill: "#2A9D8F", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="postMeal"
                  stroke="#E76F51"
                  strokeWidth={2}
                  dot={{ fill: "#E76F51", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color" style={{ background: "#2A9D8F" }}></span>
                Fasting
              </span>
              <span className="legend-item">
                <span className="legend-color" style={{ background: "#E76F51" }}></span>
                Post-Meal
              </span>
            </div>
          </div>

          {/* Medicine Adherence */}
          <div className="dashboard-card">
            <h3>💊 Medicine Adherence</h3>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={adherenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {adherenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="adherence-stats">
              <div className="stat-item">
                <span className="stat-value">{healthMetrics.medicineAdherence.taken}%</span>
                <span className="stat-label">Taken</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{healthMetrics.medicineAdherence.missed}%</span>
                <span className="stat-label">Missed</span>
              </div>
            </div>
          </div>

          {/* Diet Compliance */}
          <div className="dashboard-card">
            <h3>🥗 Diet Compliance</h3>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={dietComplianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dietComplianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="adherence-stats">
              <div className="stat-item">
                <span className="stat-value">{healthMetrics.dietCompliance.compliant}%</span>
                <span className="stat-label">Compliant</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{healthMetrics.dietCompliance.nonCompliant}%</span>
                <span className="stat-label">Non-Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthDashboard;
