import User from "../models/User.js";
import Withdrawal from "../models/Withdrawal.js";
import Video from "../models/Video.js";

/* ================= GET USER PROFILE ================= */
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

/* ================= UPDATE UPI ================= */
export const updateUpi = async (req, res) => {
    try {
        const { upiId } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.upiId = upiId;
        await user.save();

        res.json({ success: true, message: "UPI ID updated successfully", upiId: user.upiId });
    } catch (error) {
        res.status(500).json({ message: "Failed to update UPI ID" });
    }
};

/* ================= GET USER HISTORY ================= */
export const getUserHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Fetch Income History (Completed Tasks)
        const user = await User.findById(userId).populate("completedTasks.videoId", "title rewardAmount");

        const incomeHistory = (user.completedTasks || []).map(task => ({
            type: "income",
            title: task.videoId ? task.videoId.title : "Video Task",
            amount: task.videoId ? task.videoId.rewardAmount : 1,
            date: task.completedAt,
            status: "completed"
        }));

        // 2. Fetch Withdrawal History
        const withdrawals = await Withdrawal.find({ user: userId }).sort({ createdAt: -1 });

        const withdrawalHistory = withdrawals.map(w => ({
            type: "withdrawal",
            title: "Withdrawal Request",
            amount: w.amount,
            date: w.createdAt,
            status: w.status
        }));

        // 3. Merge and Sort
        const combinedHistory = [...incomeHistory, ...withdrawalHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({
            success: true,
            history: combinedHistory
        });
    } catch (error) {
        console.error("History fetch error:", error);
        res.status(500).json({ message: "Failed to fetch history" });
    }
};
