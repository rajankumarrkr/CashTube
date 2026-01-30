import api from "./api";

export const getTodayVideo = () => api.get("/video/today");

export const claimReward = () => api.post("/video/claim");
