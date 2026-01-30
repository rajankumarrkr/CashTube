import Withdrawal from "../models/Withdrawal.js";
import User from "../models/User.js";

/* ================= GET ALL WITHDRAWALS ================= */
export const getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("user", "mobile")
      .sort({ createdAt: -1 });

    res.json({ success: true, withdrawals });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch withdrawals" });
  }
};

/* ================= UPDATE WITHDRAWAL STATUS ================= */
export const updateWithdrawalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // approved / rejected

    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal not found" });
    }

    if (withdrawal.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    // If rejected → refund amount
    if (status === "rejected") {
      const user = await User.findById(withdrawal.user);
      user.walletBalance += withdrawal.amount;
      await user.save();
    }

    withdrawal.status = status;
    await withdrawal.save();

    res.json({
      success: true,
      message: `Withdrawal ${status}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
