import React, { createContext, useState } from "react";

export const ElderlyModeContext = createContext();

export function ElderlyModeProvider({ children }) {
  const [elderlyMode, setElderlyMode] = useState(false);

  return (
    <ElderlyModeContext.Provider
      value={{
        elderlyMode,
        setElderlyMode,
      }}
    >
      {children}
    </ElderlyModeContext.Provider>
  );
}
