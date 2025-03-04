 
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

 
type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  highContrastMode: boolean;
  toggleHighContrastMode: () => void;
};

 
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  highContrastMode: false,
  toggleHighContrastMode: () => {},
});

 
export const useTheme = () => useContext(ThemeContext);
 
type ThemeProviderProps = {
  children: ReactNode;
};

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
 
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);

 
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedHighContrastMode = localStorage.getItem("highContrastMode");
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "enabled");
    }
    
    if (savedHighContrastMode) {
      setHighContrastMode(savedHighContrastMode === "enabled");
    }
  }, []);

 
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");
  };

    const toggleHighContrastMode = () => {
    const newHighContrastMode = !highContrastMode;
    setHighContrastMode(newHighContrastMode);
    localStorage.setItem("highContrastMode", newHighContrastMode ? "enabled" : "disabled");
  };

 
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
 
      ...(highContrastMode && {

        contrastThreshold: 4.5,
        tonalOffset: 0.3,
      }),
    },

  });


  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        highContrastMode,
        toggleHighContrastMode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};