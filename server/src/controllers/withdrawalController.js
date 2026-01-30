import Withdrawal from "../models/Withdrawal.js";
import User from "../models/User.js";

/* ================= REQUEST WITHDRAWAL ================= */
export const requestWithdrawal = async (req, res) => {
  try {
    const { amount, upiId } = req.body;
    const user = await User.findById(req.user._id);

    if (amount < 100) {
      return res.status(400).json({ message: "Minimum withdrawal is ₹100" });
    }

    if (user.walletBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const charge = 15;
    const netAmount = amount - charge;

    const withdrawal = await Withdrawal.create({
      user: user._id,
      amount,
      charge,
      netAmount,
      upiId,
    });

    // Deduct balance immediately
    user.walletBalance -= amount;
    await user.save();

    res.json({
      success: true,
      message: "Withdrawal request submitted",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({ message: "Withdrawal request failed" });
  }
};
