import express from "express";
import multer from "multer";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const router = express.Router();

// Configure multer to store uploaded files temporarily
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("video"), (req, res) => {
  console.log("Received a POST request to /convert");
  console.log("Headers:", req.headers);
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).json({ message: "No file uploaded" });
  }

  const inputPath = req.file.path;
  const outputPath = inputPath + ".mp4";

  console.log("Converting file:");
  console.log("Input file:", inputPath);
  console.log("Output file:", outputPath);

  // Build FFmpeg command (ensure ffmpeg is installed on your server)
  const command = `ffmpeg -y -i ${inputPath} -c:v libx264 -preset veryfast -crf 22 ${outputPath}`;

  console.log("Executing command:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Conversion error:", error);
      console.error("stderr:", stderr);
      return res.status(500).json({ message: "Conversion failed", error: error.message });
    }
    console.log("Conversion stdout:", stdout);
    console.log("Conversion completed, sending file...");

    res.download(outputPath, "recorded_session.mp4", (err) => {
      if (err) {
        console.error("Error sending file:", err);
      } else {
        console.log("File sent successfully!");
      }
      // Clean up temporary files
      try {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        console.log("Temporary files removed.");
      } catch (cleanupError) {
        console.error("Error cleaning up temporary files:", cleanupError);
      }
    });
  });
});

export default router;
