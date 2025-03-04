import React, { useState } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper } from "@mui/material";
import { useTheme } from "../Themes/DarkMode2.tsx";

const SettingsPage: React.FC = () => {
 
  const { darkMode, toggleDarkMode, highContrastMode, toggleHighContrastMode } = useTheme();
  
 
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem("notifications") === "enabled" || true
  );

 
  const handleNotificationsToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("notifications", newValue ? "enabled" : "disabled");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
    
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="primary"
            />
          }
          label="Dark Mode"
        />
        <Typography variant="body2" color="textSecondary">
         Dark mode for if you dont got outside (get a life)
        </Typography>
      </Paper>
  
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
              color="primary"
            />
          }
          label="Enable Notifications"
        />
        <Typography variant="body2" color="textSecondary">
          Receive notifications for important updates and messages.
        </Typography>
      </Paper>
      
 
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={highContrastMode}
              onChange={toggleHighContrastMode}
              color="primary"
            />
          }
          label="High Contrast Mode"
        />
        <Typography variant="body2" color="textSecondary">
          Increase contrast for better readability and accessibility.
        </Typography>
      </Paper>
      
      {/* Additional Settings (Placeholder) */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Additional Settings
        </Typography>
        <Typography variant="body2" color="textSecondary">
          i give up
        </Typography>
      </Paper>
    </Box>
  );
};

export default SettingsPage;