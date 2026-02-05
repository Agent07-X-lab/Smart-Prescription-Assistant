import React from "react";

function DietPlan({ diet }) {
  return (
    <div className="card">
      <h2>🥗 Personalized Diet Plan</h2>

      <div className="diet-section">
        <h3>
          <span className="diet-icon eat">✅</span> Foods to Eat
        </h3>
        <div className="food-list eat-list">
          {diet.eat.map((food) => (
            <div key={food} className="food-item eat-item">
              {food}
            </div>
          ))}
        </div>
      </div>

      <div className="diet-section">
        <h3>
          <span className="diet-icon avoid">❌</span> Foods to Avoid
        </h3>
        <div className="food-list avoid-list">
          {diet.avoid.map((food) => (
            <div key={food} className="food-item avoid-item">
              {food}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DietPlan;
