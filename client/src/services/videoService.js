import api from "./api";

export const getTodayVideo = () => api.get("/video/today");

export const claimReward = (videoId) => api.post("/video/claim", { videoId });
