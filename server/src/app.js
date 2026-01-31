import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import withdrawalRoutes from "./routes/withdrawalRoutes.js";
import adminWithdrawalRoutes from "./routes/adminWithdrawalRoutes.js";
import adminVideoRoutes from "./routes/adminVideoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "https://cash-tube-two.vercel.app/",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});


app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/withdrawal", withdrawalRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminWithdrawalRoutes);
app.use("/api/admin", adminVideoRoutes);

// Global Error Handler

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err);
  res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

export default app;
