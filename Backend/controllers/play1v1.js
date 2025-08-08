const User = require("../model/userModel");
const UserFriend = require("../model/userFriends");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { io, userSocketMap, getReceiverSocketId } = require("../db/socket");

const playWithRandomOnlineUser = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    const onlineUserIds = Object.keys(userSocketMap).filter(
      (id) => id !== currentUserId
    );

    if (onlineUserIds.length === 0) {
      return res.status(404).json({ msg: "No online users available." });
    }

    const randomIndex = Math.floor(Math.random() * onlineUserIds.length);
    // const opponentUserId = onlineUserIds[randomIndex];
    const opponentUserId = "688ddf2cc85ef43a8df93b78"; // for now, hardcoded

    const opponent = await User.findById(opponentUserId).select(
      "username name"
    );
    if (!opponent) {
      return res.status(404).json({ msg: "Opponent not found." });
    }

    const currentUserSocketId = getReceiverSocketId(currentUserId);
    const opponentSocketId = getReceiverSocketId(opponentUserId);

    io.to(currentUserSocketId).emit("matchFound", {
      opponentId: opponentUserId,
      opponentName: opponent.username || opponent.name,
    });

    io.to(opponentSocketId).emit("matchFound", {
      opponentId: currentUserId,
      opponentName: req.user.username || req.user.name,
    });

    return res.status(200).json({
      msg: "Match found",
      opponentId: opponentUserId,
      opponentName: opponent.username || opponent.name,
    });
  } catch (error) {
    console.error("Matchmaking error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  playWithRandomOnlineUser,
};
