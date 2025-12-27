import { Router } from "express";
import LostFound from "../models/LostFound.js";

const router = Router();

// CREATE lost/found post
router.post("/", async (req, res) => {
  try {
    const post = await LostFound.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET all lost/found posts
router.get("/", async (req, res) => {
  const posts = await LostFound.find().sort({ createdAt: -1 });
  res.json(posts);
});

export default router;