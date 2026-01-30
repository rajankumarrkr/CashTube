import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { requestWithdrawal } from "../controllers/withdrawalController.js";

const router = express.Router();

router.post("/request", authMiddleware, requestWithdrawal);

export default router;
