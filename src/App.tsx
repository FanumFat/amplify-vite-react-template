import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StudentProfile from "./components/StudentProfile.tsx";
import SettingsPage from "./components/Settings.tsx";
import { CustomThemeProvider } from "./Themes/DarkMode2.tsx";
import "./App.css";

function AppContent() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    signOut();
    handleMenuClose();
  };

  return (
    <BrowserRouter>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Mville Second Hand
          </Typography>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose} style={{ color: "blue" }}>
          Student Profile
        </MenuItem>
        <MenuItem component={Link} to="/notifications" onClick={handleMenuClose} style={{ color: "blue" }}>
          Notifications
        </MenuItem>
        <MenuItem component={Link} to="/settings" onClick={handleMenuClose} style={{ color: "blue" }}>
          Settings
        </MenuItem>
        <MenuItem component={Link} to="/" onClick={handleMenuClose} style={{ color: "red" }}>
          Home
        </MenuItem>
        <MenuItem onClick={handleLogOut} style={{ color: "red" }}>
          Log Out
        </MenuItem>
      </Menu>

      <div style={{ marginTop: 64 }}>
        <Routes>
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/notifications" element={<div>Notifications Page</div>} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;