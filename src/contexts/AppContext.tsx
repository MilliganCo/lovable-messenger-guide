import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  isOnboarded: boolean;
  setOnboarded: (v: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  isOnboarded: false,
  setOnboarded: () => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setOnboarded] = useState(() => {
    return localStorage.getItem("messenger-onboarded") === "true";
  });

  const handleSetOnboarded = (v: boolean) => {
    setOnboarded(v);
    localStorage.setItem("messenger-onboarded", String(v));
  };

  return (
    <AppContext.Provider value={{ isOnboarded, setOnboarded: handleSetOnboarded }}>
      {children}
    </AppContext.Provider>
  );
};
