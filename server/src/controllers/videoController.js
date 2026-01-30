import Video from "../models/Video.js";
import User from "../models/User.js";

/* ================= GET TODAY'S VIDEO ================= */
export const getTodayVideo = async (req, res) => {
  try {
    const user = req.user;

    const today = new Date().toDateString();

    // 🔥 CHECK: aaj already claim kar chuka?
    if (
      user.lastVideoDate &&
      user.lastVideoDate.toDateString() === today
    ) {
      return res.json({
        success: true,
        todayTaskCompleted: true,
      });
    }

    // 🔥 agar task pending hai to video bhejo
    const video = await Video.findOne({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!video) {
      return res.status(404).json({
        message: "No video available today",
      });
    }

    res.json({
      success: true,
      todayTaskCompleted: false,
      video,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch video" });
  }
};

/* ================= CLAIM REWARD ================= */
export const claimVideoReward = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const today = new Date().toDateString();

    if (user.lastVideoDate?.toDateString() === today) {
      return res
        .status(400)
        .json({ message: "Reward already claimed today" });
    }

    user.walletBalance += 5;
    user.lastVideoDate = new Date();
    await user.save();

    res.json({
      success: true,
      message: "₹5 credited successfully",
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ message: "Reward claim failed" });
  }
};
