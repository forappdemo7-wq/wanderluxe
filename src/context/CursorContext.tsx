import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  butlerEnabled: boolean;
  setButlerEnabled: (enabled: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [butlerEnabled, setButlerEnabledState] = useState<boolean>(true);

  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('wanderluxe_virtual_butler');
        if (saved !== null) {
          setButlerEnabledState(saved === 'true');
        }
      }
    } catch (e) {
      console.warn("localStorage is not available:", e);
    }
  }, []);

  const setButlerEnabled = (enabled: boolean) => {
    setButlerEnabledState(enabled);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('wanderluxe_virtual_butler', String(enabled));
      }
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
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
