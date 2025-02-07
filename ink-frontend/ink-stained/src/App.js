import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./layout/navbar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import ThemeSelector from "./components/ThemeSelector";
import { Box, IconButton } from "@mui/material";
import { SocketContext, socket } from "./utils/SocketContext";
import MusicPlayer from "./layout/radio/MusicPlayer";
import { Dashboard, NavigateNext, SickRounded } from "@mui/icons-material";

function App() {
  const themeColor = useSelector((state) => state.theme.color);
  const {isAuthenticated} = useSelector((state) => state.auth);
  const [showNav, setShowNav] = useState(true);

  return (
    <SocketContext.Provider value={socket}>
      <Box
        sx={{
          backgroundColor: themeColor,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Router>
          <Box sx={{ display: "flex" }}>
            {(showNav && isAuthenticated) && <Sidebar />}
            <MusicPlayer></MusicPlayer>
            <IconButton 
              color="primary"
              sx={{
                position: 'absolute',
                top: "112px",
                left: '12px',
                width: 40,
                height: 40,
                backgroundColor: "white",
                boxShadow: 3,
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
              onClick={()=>{
                setShowNav(!showNav)
              }}
            >
              <Dashboard/>
            </IconButton>
            <ThemeSelector />
            <Box
              sx={{ padding: "1vw 0vw 0vw 4vw", width: "96vw", minHeight: "100vh" }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
              </Suspense>
            </Box>
          </Box>
        </Router>
      </Box>
    </SocketContext.Provider>
  );
}

export default App;
