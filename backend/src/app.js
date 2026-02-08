import express from "express";
import cors from "cors";

import repoRoutes from "./routes/repoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Main Route
app.use("/api/repo", repoRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Repo AI Assistant Backend Running ✅");
});

export default app;
