import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ChatBox from "./widgets/ChatBox";
import { useSelector } from "react-redux";

const CloseButton = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      color: "red",
    }}
    aria-label="remove"
  >
    <CloseIcon />
  </IconButton>
);

const availableWidgets = [
  // { id: "1", name: "Happenings", component: <Happenings /> },
  { id: "4", name: "Send Text", component: <ChatBox /> },
  // { id: "6", name: "Plan Today", component: <PlanToday /> },
];

function Dashboard() {
  const [widgets, setWidgets] = useState(availableWidgets);
  const [open, setOpen] = useState(false);

  // Redux Selectors
  const { user, loading: userLoading } = useSelector((state) => state.auth);


  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const unusedWidgets = availableWidgets.filter(
    (widget) => !widgets.find((w) => w.id === widget.id)
  );

  return (
    <Box sx={{ width: "100%", margin: "0 20px" }}>
      <Box
        sx={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Widget
        </Button>
      </Box>
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid item xs={12} sm={6} md={4} key={widget.id}>
            <Box
              sx={{
                backgroundColor: "rgba(5, 5, 5, 0.1)",
                position: "relative",
                height: "60vh",
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden'
              }}
            >
              <CloseButton onClick={() => removeWidget(widget.id)} />
              {widget.component}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h4>Available Widgets</h4>
          {unusedWidgets.length ? (
            unusedWidgets.map((widget) => (
              <Button
                key={widget.id}
                variant="contained"
                sx={{ display: "block", marginBottom: 1 }}
                onClick={() => setWidgets([...widgets, widget])}
              >
                Add {widget.name}
              </Button>
            ))
          ) : (
            <p>No widgets left to add.</p>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Dashboard;
