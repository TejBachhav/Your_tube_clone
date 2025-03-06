import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import videoroutes from "./Routes/video.js";
import userroutes from "./Routes/User.js";
import commentroutes from "./Routes/comment.js";

// Load environment variables early
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));

// Basic route
app.get("/", (req, res) => {
  res.send("Your tube is working");
});

// Route handlers
app.use(bodyParser.json());
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/comment", commentroutes);

// Define PORT and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

// Retrieve the DB connection URL from environment variables
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  console.error("Error: DB_URL environment variable is not defined.");
  process.exit(1); // Exit if DB_URL isn't provided
}

console.log("Connecting to MongoDB with URL:", DB_URL);

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB Database connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
