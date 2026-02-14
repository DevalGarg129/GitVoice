import express from "express";
import { explainFileController } from "../controllers/fileController.js";

const router = express.Router();

router.post("/explain", explainFileController);
export default router;
