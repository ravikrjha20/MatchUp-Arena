const User = require("../model/userModel");
const UserFriend = require("../model/userFriends");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { io, userSocketMap, getReceiverSocketId } = require("../db/socket");

/**
 * Send a friend request to another user
 */
const sendRequest = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;

    if (userId === friendId)
      throw new CustomError.BadRequestError("Cannot request yourself");

    const friend = await User.findById(friendId);
    if (!friend) throw new CustomError.NotFoundError("User not found");

    let userNet = await UserFriend.findOne({ userId });
    let friendNet = await UserFriend.findOne({ userId: friendId });

    if (!userNet) userNet = await UserFriend.create({ userId });
    if (!friendNet) friendNet = await UserFriend.create({ userId: friendId });

    if (userNet.friends.some((f) => f.friendId.equals(friendId)))
      throw new CustomError.BadRequestError("Already friends");
    if (userNet.outgoingRequests.some((r) => r.friendId.equals(friendId)))
      throw new CustomError.BadRequestError("Already requested");
    if (userNet.incomingRequests.some((r) => r.friendId.equals(friendId)))
      throw new CustomError.BadRequestError("They already sent you a request");

    userNet.outgoingRequests.push({ friendId });
    friendNet.incomingRequests.push({ friendId: userId });

    await userNet.save();
    await friendNet.save();

    res.status(StatusCodes.OK).json({ msg: "Request sent" });
  } catch (err) {
    next(err);
  }
};

/**
 * Accept a pending friend request
 */
const acceptRequest = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;

    const userNet = await UserFriend.findOne({ userId });
    const friendNet = await UserFriend.findOne({ userId: friendId });

    if (!userNet || !friendNet)
      throw new CustomError.NotFoundError("Network(s) not found");

    const incomingIdx = userNet.incomingRequests.findIndex((r) =>
      r.friendId.equals(friendId)
    );
    const outgoingIdx = friendNet.outgoingRequests.findIndex((r) =>
      r.friendId.equals(userId)
    );

    if (incomingIdx === -1 || outgoingIdx === -1)
      throw new CustomError.BadRequestError("No such request");

    userNet.incomingRequests.splice(incomingIdx, 1);
    friendNet.outgoingRequests.splice(outgoingIdx, 1);

    userNet.friends.push({ friendId });
    friendNet.friends.push({ friendId: userId });

    await userNet.save();
    await friendNet.save();

    res.status(StatusCodes.OK).json({ msg: "Friend request accepted" });
  } catch (err) {
    next(err);
  }
};

/**
 * Decline a pending friend request
 */
const declineRequest = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;

    const userNet = await UserFriend.findOne({ userId });
    const friendNet = await UserFriend.findOne({ userId: friendId });

    if (!userNet || !friendNet)
      throw new CustomError.NotFoundError("Network(s) not found");

    const incomingIdx = userNet.incomingRequests.findIndex((r) =>
      r.friendId.equals(friendId)
    );
    const outgoingIdx = friendNet.outgoingRequests.findIndex((r) =>
      r.friendId.equals(userId)
    );

    if (incomingIdx === -1 || outgoingIdx === -1)
      throw new CustomError.BadRequestError("No such request");

    userNet.incomingRequests.splice(incomingIdx, 1);
    friendNet.outgoingRequests.splice(outgoingIdx, 1);

    await userNet.save();
    await friendNet.save();

    res.status(StatusCodes.OK).json({ msg: "Friend request declined" });
  } catch (err) {
    next(err);
  }
};

/**
 * Remove a friend
 */
const removeFriend = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;

    const userNet = await UserFriend.findOne({ userId });
    const friendNet = await UserFriend.findOne({ userId: friendId });

    if (!userNet || !friendNet)
      throw new CustomError.NotFoundError("Network(s) not found");

    userNet.friends = userNet.friends.filter(
      (f) => !f.friendId.equals(friendId)
    );
    friendNet.friends = friendNet.friends.filter(
      (f) => !f.friendId.equals(userId)
    );

    await userNet.save();
    await friendNet.save();

    res.status(StatusCodes.OK).json({ msg: "Friend removed" });
  } catch (err) {
    next(err);
  }
};

/**
 * Search users by query
 */ const searchUsers = async (req, res, next) => {
  try {
    const q = req.query.name || req.query.username || ""; // support both 'name' and 'username'
    if (!q) return res.json({ suggestions: [] });

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } }, // case-insensitive partial match
        { name: { $regex: q, $options: "i" } },
      ],
    })
      .select("_id name username image")
      .limit(20)
      .lean();

    // Remove any possible duplicates by _id just in case
    const seen = new Set();
    const uniqueUsers = users.filter((user) => {
      const idStr = user._id.toString();
      if (seen.has(idStr)) return false;
      seen.add(idStr);
      return true;
    });

    res.status(200).json({ suggestions: uniqueUsers }); // wrap in { suggestions: [] } for clarity
  } catch (err) {
    next(err);
  }
};

/**
 * Get current user's friends
 */
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      throw new CustomError.BadRequestError("Username is required");
    }

    const user = await User.findOne({ username }).select(
      "username avatar rating wins losses draws coins createdAt"
    );

    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }

    res.status(200).json({ profile: user });
  } catch (error) {
    next(error);
  }
};

const getFriends = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userNet = await UserFriend.findOne({ userId }).populate(
      "friends.friendId",
      "name username image isOnline"
    );
    if (!userNet) return res.json([]);
    res.status(StatusCodes.OK).json(userNet.friends);
  } catch (err) {
    next(err);
  }
};

/**
 * Get incoming friend requests
 */
const getIncomingRequests = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userNet = await UserFriend.findOne({ userId }).populate(
      "incomingRequests.friendId",
      "name username image"
    );
    if (!userNet) return res.json([]);
    res.status(StatusCodes.OK).json(userNet.incomingRequests);
  } catch (err) {
    next(err);
  }
};

/**
 * Get outgoing friend requests
 */
const getOutgoingRequests = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userNet = await UserFriend.findOne({ userId }).populate(
      "outgoingRequests.friendId",
      "name username image"
    );
    if (!userNet) return res.json([]);
    res.status(StatusCodes.OK).json(userNet.outgoingRequests);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all friends (user document with full details)
 */ const getAllFriends = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const userNet = await UserFriend.findOne({ userId }).populate(
      "friends.friendId",
      "name username image isOnline" // ← only these fields are included
    );

    if (!userNet) return res.status(StatusCodes.OK).json([]);

    const fullFriends = userNet.friends.map((f) => f.friendId);

    res.status(StatusCodes.OK).json(fullFriends);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  declineRequest,
  removeFriend,
  searchUsers,
  getFriends,
  getIncomingRequests,
  getOutgoingRequests,
  getAllFriends,
  getUserProfile,
};
