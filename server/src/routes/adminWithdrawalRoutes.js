import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getAllWithdrawals,
  updateWithdrawalStatus,
} from "../controllers/adminWithdrawalController.js";

const router = express.Router();

router.get("/withdrawals", adminMiddleware, getAllWithdrawals);
router.put("/withdrawals/:id", adminMiddleware, updateWithdrawalStatus);

export default router;
