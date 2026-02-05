import React, { useContext } from "react";
import { ElderlyModeContext } from "../contexts/ElderlyModeContext";

function ElderlyModeToggle() {
  const { elderlyMode, setElderlyMode } = useContext(ElderlyModeContext);

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
      <span className="toggle-label">🧓 Elderly Mode</span>
    </div>
  );
}

export default ElderlyModeToggle;
