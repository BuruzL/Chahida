import express from "express";
import { askAIController } from "../controllers/aiController.js";

const router = express.Router();
router.post("/ask", askAIController);
export default router;
