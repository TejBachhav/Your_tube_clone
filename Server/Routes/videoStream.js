// server/routes/videoStream.js
import express from "express";
import { streamVideo } from "../Controllers/streamcontroller.js";

const router = express.Router();

// Route format: GET /video/stream/:id/:quality
router.get("/video/stream/:id/:quality", streamVideo);

export default router;
