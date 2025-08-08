const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { playWithRandomOnlineUser } = require("../controllers/play1v1");

router.get("/playonevone", authenticateUser, playWithRandomOnlineUser);

module.exports = router;
