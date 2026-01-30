import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getTodayVideo,
  claimVideoReward,
} from "../controllers/videoController.js";

const router = express.Router();

router.get("/today", authMiddleware, getTodayVideo);
router.post("/claim", authMiddleware, claimVideoReward);

export default router;
