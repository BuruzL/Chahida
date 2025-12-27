import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import aiRoutes from "./src/routes/aiRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import lostFoundRoutes from "./src/routes/lostFoundRoutes.js";

const app = express();

// Allow larger JSON bodies (images in base64 from frontend)
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

    await mongoose.connect(mongoUri, { dbName: undefined });
    console.log('MongoDB Connected to', mongoUri);
    console.log('Mongoose readyState:', mongoose.connection.readyState);

    mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
    mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected'));

    // Register routes
    app.use('/api/ai', aiRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/lost-found', lostFoundRoutes);

    // Debug route to verify DB/URI used (handy when using MongoDB Compass)
    app.get('/api/dbinfo', (req, res) => {
      res.json({
        uriUsed: mongoUri,
        readyState: mongoose.connection.readyState,
        dbName: mongoose.connection?.db?.databaseName || null,
      });
    });

    // Basic health route
    app.get('/', (req, res) => res.send('Chahida Backend Running 🚀'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server or connect to MongoDB:', err);
    process.exit(1);
  }
};

startServer();
