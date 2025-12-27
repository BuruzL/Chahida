import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./src/routes/authRoutes.js";

import postRoutes from "./src/routes/postRoutes.js";

import lostFoundRoutes from "./src/routes/lostFoundRoutes.js";



dotenv.config();

const app = express();

// Allow larger JSON bodies to accept base64 image payloads from the frontend
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Ensure Mongoose uses recommended settings
mongoose.set('strictQuery', false);

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chahida';
    if (!process.env.MONGO_URI) {
      console.warn(`MONGO_URI not set, falling back to local MongoDB: ${mongoUri}`);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected to', mongoUri);

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });

    // Routes (registered after DB connection)
    app.get('/', (req, res) => {
      res.send('Chahida Backend Running 🚀');
    });

    app.get('/api/test', (req, res) => {
      res.json({ message: 'Hello from Chahida backend' });
    });

    app.use('/api/posts', postRoutes);
    app.use('/api/lost-found', lostFoundRoutes);
    app.use('/api/auth', authRoutes);

    // Start server after DB connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

startServer();
