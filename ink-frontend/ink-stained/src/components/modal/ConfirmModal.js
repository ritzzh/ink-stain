import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

function ConfirmationModal({
  open, // Boolean to control modal visibility
  handleClose, // Function to close the modal
  message, // Confirmation message
  showCancel = true, // Show 'Cancel' button (optional, default = true)
  showConfirm = true, // Show 'Confirm' button (optional, default = true)
  onConfirm, // Function to handle 'Confirm' button click
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#fffefc",
          border: "2px solid #b39ddb",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          id="confirmation-modal-title"
          variant="h6"
          component="h2"
          sx={{
            color: "#4527a0",
            fontFamily: "'Dancing Script', cursive",
            marginBottom: 2,
          }}
        >
          Are you sure?
        </Typography>
        <Typography
          id="confirmation-modal-description"
          sx={{
            color: "#6b4e4e",
            fontFamily: "'Roboto', sans-serif",
            marginBottom: 3,
          }}
        >
          {message}
        </Typography>

        {/* Button Stack */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {showCancel && (
            <Button
              variant="contained"
              onClick={() => {
                handleClose(); // Close modal
                onConfirm(false); // Return false for Cancel
              }}
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
              Cancel
            </Button>
          )}
          {showConfirm && (
            <Button
              variant="contained"
              onClick={() => {
                handleClose(); // Close modal
                onConfirm(true); // Return true for Confirm
              }}
              sx={{
                backgroundColor: "#66bb6a",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#43a047",
                },
              }}
            >
              Confirm
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
