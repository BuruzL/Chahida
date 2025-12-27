import express from "express";
import { askCampusGenie } from "../controllers/genieController.js";
const router = express.Router();

router.post("/ask", askCampusGenie);
export default router;