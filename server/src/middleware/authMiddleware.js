import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("Auth failed: No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("Auth failed: User not found for ID:", decoded.id);
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.isBlocked) {
      console.log("Auth failed: User is blocked");
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth failed: Invalid token or error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
