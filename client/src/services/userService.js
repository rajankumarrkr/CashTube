import api from "./api";

export const getUserProfile = () => api.get("/user/profile");
export const getUserHistory = () => api.get("/user/history");
export const updateUpi = (upiId) => api.post("/user/update-upi", { upiId });
