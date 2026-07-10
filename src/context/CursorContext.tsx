import React, { createContext, useContext, useState, useEffect } from 'react';

interface CursorContextType {
  butlerEnabled: boolean;
  setButlerEnabled: (enabled: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [butlerEnabled, setButlerEnabledState] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('wanderluxe_virtual_butler');
    if (saved !== null) {
      setButlerEnabledState(saved === 'true');
    } else {
      setButlerEnabledState(true);
    }
  }, []);

  const setButlerEnabled = (enabled: boolean) => {
    setButlerEnabledState(enabled);
    localStorage.setItem('wanderluxe_virtual_butler', String(enabled));
  };

  return (
    <CursorContext.Provider value={{ butlerEnabled, setButlerEnabled }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
