import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials))
      .unwrap()
      .then(() => navigate('/catch-up'))
      .catch(() => {}); // Error is already handled by Redux state
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card sx={{ width: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" className="text-center mb-4">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                label="Username or Email"
                name="usernameOrEmail"
                type="text"
                fullWidth
                required
                variant="outlined"
                value={credentials.usernameOrEmail}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                variant="outlined"
                value={credentials.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="mb-3">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </div>
          </form>
          <Typography variant="body2" className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
