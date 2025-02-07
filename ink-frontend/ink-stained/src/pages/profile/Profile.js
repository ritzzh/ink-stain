import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import ProfileCard from "./ProfileCard"; // Import the new component

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box className="container py-4">
      {/* Top Section */}
      <ProfileCard user={user} />

      {/* Bottom Section */}
      <Typography variant="h6" gutterBottom>
        Activity Widgets
      </Typography>
      <Grid container spacing={3}>
        {["Mood History", "Notes Sent", "Song History", "Movies Watched", "Recent Activities"].map((widget, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              className="text-center p-3 shadow-sm bg-light"
              style={{ height: "120px", borderRadius: "8px" }}
            >
              {widget}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Profile;
