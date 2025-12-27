import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./src/routes/authRoutes.js";

import postRoutes from "./src/routes/postRoutes.js";

import lostFoundRoutes from "./src/routes/lostFoundRoutes.js";



dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/lost-found", lostFoundRoutes);
app.use(cors());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Chahida Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Chahida backend" });
});

app.use("/api/auth", authRoutes);

// Server
const PORT = 7002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});