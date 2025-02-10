import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { fetchUserByUsername } from "../../api/userApi";

function Profile() {
  const {user} = useSelector((state) => state.auth);
  useEffect(()=>{
    console.log(user);
  })
  return (
    <Box className="container py-4">
    </Box>
  );
}

export default Profile;
