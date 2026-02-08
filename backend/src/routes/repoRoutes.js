import express from "express";
import {
  summarizeRepoController,
  analyzeRepoController,
  detectStackController,
} from "../controllers/repoController.js";

const router = express.Router();

// Summary
router.post("/summarize", summarizeRepoController);

// Deep Analysis
router.post("/analyze", analyzeRepoController);

// Stack Detection
router.post("/stack", detectStackController);

export default router;
