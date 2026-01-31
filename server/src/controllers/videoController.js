import Video from "../models/Video.js";
import User from "../models/User.js";

/* ================= GET TODAY'S TASKS ================= */
export const getTodayVideo = async (req, res) => {
  try {
    console.log("Fetching tasks for user:", req.user?._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date().toDateString();
    console.log("Today is:", today);

    // Get all active videos
    const videos = await Video.find({ isActive: true }).sort({ createdAt: -1 }).limit(10);
    console.log("Active videos found:", videos.length);

    // Identify which tasks are completed today - with safety checks
    const completedTasks = user.completedTasks || [];
    const completedTodayIds = completedTasks
      .filter(task => {
        if (!task.completedAt) return false;
        const taskDate = new Date(task.completedAt).toDateString();
        return taskDate === today;
      })
      .map(task => task.videoId ? task.videoId.toString() : "");

    console.log("Completed today IDs:", completedTodayIds);

    const tasks = videos.map(video => {
      const videoIdStr = video._id.toString();
      return {
        ...video.toObject(),
        isCompleted: completedTodayIds.includes(videoIdStr)
      };
    });

    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    console.error("Fetch tasks error DETAILED:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

/* ================= CLAIM REWARD ================= */
export const claimVideoReward = async (req, res) => {
  try {
    const { videoId } = req.body;
    const user = await User.findById(req.user._id);
    const today = new Date().toDateString();

    // 1. Check if video exists
    const video = await Video.findById(videoId);
    if (!video || !video.isActive) {
      return res.status(404).json({ message: "Video not found or inactive" });
    }

    // 2. Check if already completed today
    const completedTasks = user.completedTasks || [];
    const alreadyDone = completedTasks.find(
      task => task.videoId && task.videoId.toString() === videoId &&
        task.completedAt && new Date(task.completedAt).toDateString() === today
    );

    if (alreadyDone) {
      return res.status(400).json({ message: "Task already completed today" });
    }

    // 3. Update wallet and completed tasks
    user.walletBalance += video.rewardAmount; // Use reward from video model (default is 1)
    user.completedTasks.push({
      videoId: videoId,
      completedAt: new Date()
    });

    // Also update lastVideoDate for backward compatibility if needed
    user.lastVideoDate = new Date();

    await user.save();

    res.json({
      success: true,
      message: `₹${video.rewardAmount} credited to wallet`,
      walletBalance: user.walletBalance,
      videoId
    });
  } catch (error) {
    console.error("Claim reward error:", error);
    res.status(500).json({ message: "Reward claim failed" });
  }
};
