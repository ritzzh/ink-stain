import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/dashboard/DashBoard';
import Hangout from '../pages/hangout/Hangout';
import Profile from '../pages/profile/Profile';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/catch-up"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/hangout"
        element={
          <PrivateRoute>
            <Hangout />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  </Suspense>
);
export default AppRoutes;
