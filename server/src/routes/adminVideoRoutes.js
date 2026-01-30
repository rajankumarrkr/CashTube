import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  addVideo,
  toggleVideo,
  getAllVideos,
} from "../controllers/adminVideoController.js";

const router = express.Router();

router.post("/videos", adminMiddleware, addVideo);
router.put("/videos/:id/toggle", adminMiddleware, toggleVideo);
router.get("/videos", adminMiddleware, getAllVideos);

export default router;
