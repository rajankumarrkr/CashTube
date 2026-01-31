import User from "../models/User.js";
import Admin from "../models/Admin.js";
import generateReferralCode from "../utils/generateReferralCode.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

/* ================= USER REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { mobile, password, referralCode } = req.body;

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      mobile,
      password: hashedPassword,
      referralCode: generateReferralCode(),
      referredBy: referralCode || null,
    });

    // Referral bonus logic
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referrer.walletBalance += 5;
        await referrer.save();
      }
    }

    res.status(201).json({
      success: true,
      token: generateToken(newUser._id),
      user: {
        id: newUser._id,
        mobile: newUser.mobile,
        walletBalance: newUser.walletBalance,
        referralCode: newUser.referralCode,
      },
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

/* ================= USER LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        mobile: user.mobile,
        walletBalance: user.walletBalance,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ================= ADMIN LOGIN ================= */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    res.json({
      success: true,
      token: generateToken(admin._id, "admin"),
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Admin login failed" });
  }
};
