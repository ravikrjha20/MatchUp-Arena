const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", tokenSchema);
