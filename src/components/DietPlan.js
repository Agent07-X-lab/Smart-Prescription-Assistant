import React from "react";

function DietPlan({ diet }) {
  if (!diet) {
    return (
      <div className="card">
        <h2>🥗 Personalized Diet Plan</h2>
        <p>No diet plan available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🥗 Personalized Diet Plan</h2>

      <div className="diet-section">
        <h3>
          <span className="diet-icon eat">✅</span> Foods to Eat
        </h3>
        <div className="food-list eat-list">
          {diet.eat && diet.eat.map((food) => (
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
          {diet.avoid && diet.avoid.map((food) => (
            <div key={food} className="food-item avoid-item">
              {food}
            </div>
          ))}
        </div>
      </div>

      {diet.mealPlan && (
        <div className="diet-section">
          <h3>
            <span className="diet-icon eat">📋</span> Daily Meal Plan
          </h3>
          <div className="meal-plan-details">
            <div className="meal-item">
              <strong>🌅 Breakfast:</strong> {diet.mealPlan.breakfast}
            </div>
            <div className="meal-item">
              <strong>☀️ Lunch:</strong> {diet.mealPlan.lunch}
            </div>
            <div className="meal-item">
              <strong>🌙 Dinner:</strong> {diet.mealPlan.dinner}
            </div>
            <div className="meal-item">
              <strong>🍎 Snacks:</strong> {diet.mealPlan.snacks}
            </div>
          </div>
        </div>
      )}

      {diet.tips && diet.tips.length > 0 && (
        <div className="diet-section">
          <h3>
            <span className="diet-icon eat">💡</span> Diet Tips
          </h3>
          <ul className="diet-tips-list">
            {diet.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DietPlan;
