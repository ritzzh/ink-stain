import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

function ErrorModal({ open, handleClose, errorMessage }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#fff5f7",
          border: "2px solid #f8b5c8",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          id="error-modal-title"
          variant="h6"
          component="h2"
          sx={{
            color: "#d32f2f",
            fontFamily: "'Dancing Script', cursive",
            marginBottom: 2,
          }}
        >
          Oops! Something went wrong.
        </Typography>
        <Typography
          id="error-modal-description"
          sx={{
            color: "#6b4e4e",
            fontFamily: "'Roboto', sans-serif",
            marginBottom: 3,
          }}
        >
          {errorMessage}
        </Typography>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            backgroundColor: "#f06292",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            ":hover": {
              backgroundColor: "#ec407a",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ErrorModal;