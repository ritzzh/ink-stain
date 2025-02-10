import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Button, Tooltip } from '@mui/material'; // MUI Button and Tooltip
import {
  CatchingPokemon,
  CalendarToday,
  DirectionsRun,
  AccountCircle,
  Fingerprint,
  Home,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux'; // Import useDispatch for dispatching actions
import { logout } from '../../features/auth/authSlice'; // Import the logout thunk

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        position: 'fixed',
        top: '50%',
        left: '0',
        transform: 'translateY(-50%)',
        height: 'auto',
        width: '60px',
        backgroundColor: 'rgba(f, f, f, 0.3)',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        borderRadius: '0 10px 10px 0',
        paddingTop: '20px',
      }}
    >
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <Tooltip title="Catch Up" arrow>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Home />
          </Button>
        </Tooltip>
      </Link>
      
      <Link to="/catch-up" style={{ textDecoration: 'none' }}>
        <Tooltip title="Catch Up" arrow>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CatchingPokemon />
          </Button>
        </Tooltip>
      </Link>

      <Link to="/hangout" style={{ textDecoration: 'none' }}>
        <Tooltip title="Activities" arrow>
          <Button
            variant="contained"
            color="success"
            sx={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DirectionsRun />
          </Button>
        </Tooltip>
      </Link>

      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <Tooltip title="Profile" arrow>
          <Button
            variant="contained"
            color="default"
            sx={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '50%',
              minWidth: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AccountCircle />
          </Button>
        </Tooltip>
      </Link>

      <Tooltip title="Logout" arrow>
        <Button
          variant="contained"
          color="default"
          sx={{
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '50%',
            minWidth: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleLogout} // Add onClick handler
        >
          <Fingerprint />
        </Button>
      </Tooltip>
    </div>
  );
}

export default Sidebar;
