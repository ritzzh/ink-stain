// src/utils/SocketContext.js
import { createContext } from 'react';
import { io } from 'socket.io-client';

// Replace with your backend's URL
// const SOCKET_URL = 'https://tou-backend.onrender.com';
const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL);
export const SocketContext = createContext(socket);
