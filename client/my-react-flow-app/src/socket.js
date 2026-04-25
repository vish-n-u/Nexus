import { io } from 'socket.io-client';

// Single shared socket instance for the whole app
const socket = io('http://localhost:3001', {
  autoConnect: true,
  reconnectionAttempts: 5,
});

socket.on('connect', () => {
  console.log('[socket] connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.warn('[socket] connection error:', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('[socket] disconnected:', reason);
});

export default socket;
