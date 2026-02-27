const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect DB ──
connectDB();

// ── Middleware ──
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// ── Routes ──
app.use("/api/repo", require("./routes/repoRoutes"));
app.use("/api/file", require("./routes/fileRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

// ── Health check ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "2.0.0", timestamp: new Date().toISOString() });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  if (err && err.stack) console.error(err.stack);
  // If the error comes from an axios/GitHub response, log useful details
  if (err && err.response) {
    try {
      console.error("Error response status:", err.response.status);
      console.error("Error response data:", JSON.stringify(err.response.data));
    } catch (e) {
      console.error("Error logging response details:", e);
    }
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GitVoice backend running on port ${PORT}`);
});
