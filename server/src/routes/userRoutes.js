import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    getUserProfile,
    updateUpi,
    getUserHistory,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.get("/history", authMiddleware, getUserHistory);
router.post("/update-upi", authMiddleware, updateUpi);

export default router;
