import Video from "../models/Video.js";

/* ================= ADD VIDEO ================= */
export const addVideo = async (req, res) => {
  try {
    const { title, youtubeUrl } = req.body;

    const video = await Video.create({
      title,
      youtubeUrl,
      isActive: true,
    });

    res.json({ success: true, video });
  } catch (error) {
    res.status(500).json({ message: "Failed to add video" });
  }
};

/* ================= TOGGLE VIDEO ================= */
export const toggleVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.isActive = !video.isActive;
    await video.save();

    res.json({ success: true, video });
  } catch (error) {
    res.status(500).json({ message: "Failed to update video" });
  }
};

/* ================= GET ALL VIDEOS ================= */
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};
