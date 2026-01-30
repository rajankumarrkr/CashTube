import api from "./api";

export const getAllVideos = () => api.get("/admin/videos");

export const addVideo = (data) =>
  api.post("/admin/videos", data);

export const toggleVideo = (id) =>
  api.put(`/admin/videos/${id}/toggle`);
