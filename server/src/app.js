import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import withdrawalRoutes from "./routes/withdrawalRoutes.js";
import adminWithdrawalRoutes from "./routes/adminWithdrawalRoutes.js";
import adminVideoRoutes from "./routes/adminVideoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CashTube Backend is Running 🚀");
});


app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "CashTube API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/withdrawal", withdrawalRoutes);
app.use("/api/admin", adminWithdrawalRoutes);

app.use("/api/admin", adminVideoRoutes);

export default app;
