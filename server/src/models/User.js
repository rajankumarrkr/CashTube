import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },

    password: {
      type: String,
      required: true,
    },

    referralCode: {
      type: String,
      unique: true,
    },

    referredBy: {
      type: String, // referralCode
      default: null,
    },

    walletBalance: {
      type: Number,
      default: 0,
    },

    lastVideoDate: {
      type: Date,
      default: null,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
