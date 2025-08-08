// src/sockets/index.js
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId || (socket && socket.connected)) return;

  socket = io(BASE_URL, {
    query: { userId },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};
