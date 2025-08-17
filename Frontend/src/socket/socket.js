// src/sockets/index.js
import { io } from "socket.io-client";

const API_URLS = import.meta.env.VITE_API_URLS.split(",");
const BASE_URL =
  window.location.hostname === "localhost"
    ? API_URLS[0].replace("/api/v1", "")
    : API_URLS[1].replace("/api/v1", "");

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
