require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Chahida Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Chahida backend" });
});

const PORT = 7002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

import genieRoutes from "./src/routes/genieRoutes.js";
app.use("/api/genie", genieRoutes);
