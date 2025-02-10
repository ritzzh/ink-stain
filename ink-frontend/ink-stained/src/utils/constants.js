// Base URL for local development or production
export const BASE_URL = 'http://localhost:8080/api';
// export const BASE_URL = 'https://tou-backend.onrender.com/api';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,       // User Registration
    LOGIN: `${BASE_URL}/auth/login`,             // User Login
    LOGOUT: `${BASE_URL}/auth/logout`,           // User Logout
  },
  USERS: {
    BASE: `${BASE_URL}/users`,                   // Base endpoint for users
    ALL: `${BASE_URL}/users`,                    // Fetch all users
    SINGLE: (username) => `${BASE_URL}/users/${username}`, // Fetch single user
    PASSWORD: (username) => `${BASE_URL}/users/${username}/password`, // Update user password
    DELETE: (username) => `${BASE_URL}/users/${username}`, // Delete user
    UPDATE_FIELD: (username, field) => `${BASE_URL}/users/${username}/${field}`, 
  },
  MOOD: {
    BASE: `${BASE_URL}/mood`,                     // Base endpoint for mood operations
    CURRENT: (username) => `${BASE_URL}/mood/${username}/current`, // Get or update current mood
    SET_MOOD: (username) => `${BASE_URL}/mood/${username}/setmood`, // Set mood
  },
};

export const APP_CONFIG = {
  APP_NAME: 'MyApp',                             // Application Name
  VERSION: '1.0.0',                               // Application Version
};
