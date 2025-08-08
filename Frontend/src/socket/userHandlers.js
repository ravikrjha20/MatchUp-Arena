// src/sockets/userHandlers.js
export const setupUserHandlers = (socket, setOnlineUsers) => {
  if (!socket) return;

  socket.on("getOnlineUsers", (userIds) => {
    setOnlineUsers(userIds);
  });

  socket.on("connect", () => {
    console.log("🔌 Connected to socket.io with ID:", socket.id);
  });
};
