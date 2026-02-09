import React, { useContext } from "react";
import { ElderlyModeContext } from "../contexts/ElderlyModeContext";
import { LanguageContext } from "../contexts/LanguageContext";

function ElderlyModeToggle() {
  const { elderlyMode, setElderlyMode } = useContext(ElderlyModeContext);
  const { t } = useContext(LanguageContext);

  return (
    <div className="elderly-mode-toggle">
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={elderlyMode}
          onChange={(e) => setElderlyMode(e.target.checked)}
        />
        <span className="toggle-slider"></span>
      </label>
      <span className="toggle-label">{t("elderly_mode")}</span>
    </div>
  );
}

export default ElderlyModeToggle;
