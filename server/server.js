import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";
import createAdminIfNotExists from "./src/utils/createAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // 🔥 AUTO ADMIN CREATE
    await createAdminIfNotExists();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err.message);
  });
