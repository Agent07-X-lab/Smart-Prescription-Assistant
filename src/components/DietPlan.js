import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function DietPlan({ diet }) {
  const { t } = useContext(LanguageContext);
  
  if (!diet) {
    return (
      <div className="card">
        <h2>{t("diet_plan_title")}</h2>
        <p>{t("no_diet_plan")}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{t("diet_plan_title")}</h2>

      <div className="diet-section">
        <h3>Foods to Eat</h3>
        <div className="food-list eat-list">
          {diet.eat && diet.eat.map((food) => (
            <div key={food} className="food-item eat-item">
              {food}
            </div>
          ))}
        </div>
      </div>

      <div className="diet-section">
        <h3>Foods to Avoid</h3>
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
          <h3>Daily Meal Plan</h3>
          <div className="meal-plan-details">
            <div className="meal-item">
              <strong>{t("breakfast")}:</strong> {diet.mealPlan.breakfast}
            </div>
            <div className="meal-item">
              <strong>{t("lunch")}:</strong> {diet.mealPlan.lunch}
            </div>
            <div className="meal-item">
              <strong>{t("dinner")}:</strong> {diet.mealPlan.dinner}
            </div>
            <div className="meal-item">
              <strong>{t("snack")}:</strong> {diet.mealPlan.snacks}
            </div>
          </div>
        </div>
      )}

      {diet.tips && diet.tips.length > 0 && (
        <div className="diet-section">
          <h3>Diet Tips</h3>
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
