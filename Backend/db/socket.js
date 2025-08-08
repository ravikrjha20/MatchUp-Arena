const { Server } = require(`socket.io`);
const http = require("http");
const express = require(`express`);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// for online users
const userSocketMap = {}; // {userId: socketId}
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit(
    "getOnlineUsers",
    (console.log("a user connected : ", userId), Object.keys(userSocketMap))
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit(
      "getOnlineUsers",
      (console.log("a user disconnected : ", userId),
      Object.keys(userSocketMap))
    );
  });
});

module.exports = { io, app, server, userSocketMap, getReceiverSocketId };
