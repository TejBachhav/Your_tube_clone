// // server/controllers/streamController.js
// import path from "path";
// import fs from "fs";
// import Video from "../Models/videofile.js"; // Adjust the model name/path accordingly

// export const streamVideo = async (req, res) => {
//   const { id, quality } = req.params;
//   try {
//     const video = await Video.findById(id);
//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     // Choose the file path based on the quality parameter.
//     let filePath;
//     if (quality === "1080p") {
//       filePath = video.filepath1080p;
//     } else if (quality === "720p") {
//       filePath = video.filepath720p;
//     } else if (quality === "480p") {
//       filePath = video.filepath480p;
//     } else if (quality === "320p") {
//       filePath = video.filepath320p;
//     } else {
//       return res.status(400).json({ message: "Invalid quality parameter" });
//     }

//     // Clean up the file path: replace backslashes with forward slashes.
//     filePath = filePath.replace(/\\/g, "/");

//     // Build the full path: assuming files are stored under public/Videos.
//     const fullPath = path.join(process.cwd(), "public", "Videos", filePath);

//     // Check if the file exists
//     if (!fs.existsSync(fullPath)) {
//       return res.status(404).json({ message: "File not found on disk" });
//     }

//     // Set the Content-Type header
//     res.set("Content-Type", "video/mp4");

//     // Stream the file to the response
//     const stream = fs.createReadStream(fullPath);
//     stream.on("error", (error) => {
//       console.error("Stream error:", error);
//       res.status(500).json({ message: "Error streaming video" });
//     });
//     stream.pipe(res);
//   } catch (error) {
//     console.error("Stream video error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


import Video from "../Models/videofile.js";

export const streamVideo = async (req, res) => {
  const { id, quality } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    let url;
    if (quality === "1080p") {
      url = video.filepath1080p;
    } else if (quality === "720p") {
      url = video.filepath720p;
    } else if (quality === "480p") {
      url = video.filepath480p;
    } else if (quality === "320p") {
      url = video.filepath320p;
    } else {
      return res.status(400).json({ message: "Invalid quality parameter" });
    }

    if (!url) {
      return res.status(404).json({ message: "Video URL not found for this quality" });
    }

    // Redirect the client to the Cloudinary URL for streaming.
    res.redirect(url);
  } catch (error) {
    console.error("Stream video error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
