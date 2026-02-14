import express from "express";
import { chatWithRepoController } from "../controllers/chatController.js";

const router = express.Router();

router.post("/ask", chatWithRepoController);
export default router;