// import videofile from "../Models/videofile.js";
// export const uploadvideo=async(req,res)=>{
//     if(req.file=== undefined){
//         res.status(404).json({message:"plz upload a mp.4 video file only"})
//     }else{
//         try {
//             const file=new videofile({
//                 videotitle:req.body.title,
//                 filename:req.file.originalname,
//                 filepath:req.file.path,
//                 filetype:req.file.mimetype,
//                 filesize:req.file.size,
//                 videochanel:req.body.chanel,
//                 uploader:req.body.uploader,
//             })
//             // console.log(file)
//             await file.save()
//             res.status(200).send("File uploaded successfully")
//         } catch (error) {
//             res.status(404).json(error.message)
//             return
//         }
//     }
// }

// export const getallvideos=async(req,res)=>{
//     try {
//         const files=await videofile.find();
//         res.status(200).send(files)
//     } catch (error) {
//         res.status(404).json(error.message)
//             return
//     }
// }

// IMP

// "use strict";
// import ffmpeg from "fluent-ffmpeg";
// import path from "path";
// import fs from "fs";
// import videofile from "../Models/videofile.js"; // Adjust the path as needed

// // Helper function to create folder if it doesn't exist
// const createFolder = (folderPath) => {
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }
// };

// export const uploadvideo = async (req, res) => {
//   if (req.file === undefined) {
//     return res.status(404).json({ message: "Please upload an MP4 video file only" });
//   } else {
//     try {
//       // Create a unique folder name using timestamp and sanitized original name
//       const folderName = Date.now() + "-" + req.file.originalname.replace(/\s/g, "_");
//       const outputDir = path.join("public", "Videos", folderName);
//       createFolder(outputDir);

//       // Define the qualities you want to generate
//       const qualities = [
//         { label: '1080p', height: 1080 },
//         { label: '720p', height: 720 },
//         { label: '480p', height: 480 },
//         { label: '320p', height: 320 },
//       ];

//       // Create promises for transcoding for each quality
//       const transcodingPromises = qualities.map(q => {
//         return new Promise((resolve, reject) => {
//           const outputPath = path.join(outputDir, `sample_${q.label}.mp4`);
//           ffmpeg(req.file.path)
//             .outputOptions([
//               `-vf scale=-2:${q.height}`,
//               '-c:v libx264',
//               '-crf 23',
//               '-preset medium',
//               '-c:a aac',
//               '-b:a 128k'
//             ])
//             .save(outputPath)
//             .on('end', () => {
//               // Save relative path starting from Videos folder
//               resolve({ label: q.label, path: path.join(folderName, `sample_${q.label}.mp4`) });
//             })
//             .on('error', (err) => reject(err));
//         });
//       });

//       const results = await Promise.all(transcodingPromises);
//       console.log("Transcoding complete:", results);

//       // Create the video document with additional fields
//       const file = req.file;
//       const videoData = {
//         videotitle: req.body.title,
//         filename: file.originalname,
//         filetype: file.mimetype,
//         filepath: path.join(folderName, file.filename), // fallback or original file path
//         filesize: file.size.toString(),
//         videochanel: req.body.chanel,
//         uploader: req.body.uploader,
//         // New fields for quality versions:
//         folder: folderName,
//         filepath1080p: results.find(r => r.label === '1080p')?.path,
//         filepath720p: results.find(r => r.label === '720p')?.path,
//         filepath480p: results.find(r => r.label === '480p')?.path,
//         filepath320p: results.find(r => r.label === '320p')?.path,
//       };

//       // Save the video document in the database
//       const savedVideo = await videofile.create(videoData);
//       res.status(200).json(savedVideo);
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       res.status(404).json({ message: error.message });
//       return;
//     }
//   }
// };

// export const getallvideos = async (req, res) => {
//   try {
//     const files = await videofile.find();
//     res.status(200).json(files);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//     return;
//   }
// };


"use strict";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import videofile from "../Models/videofile.js"; // Adjust the path as needed

// Helper function to create a folder if it doesn't exist
const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Helper function to transcode a video for a specific quality
const transcodeVideo = (inputPath, outputDir, quality) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, `sample_${quality.label}.mp4`);
    ffmpeg(inputPath)
      .outputOptions([
        `-vf scale=-2:${quality.height}`,
        "-c:v libx264",
        "-preset ultrafast", // Lower CPU usage
        "-crf 28",           // Faster encoding with lower quality
        "-c:a aac",
        "-b:a 128k"
      ])
      .save(outputPath)
      .on("end", () => {
        // Return the relative path starting from the Videos folder
        resolve({ label: quality.label, path: path.join(path.basename(outputDir), `sample_${quality.label}.mp4`) });
      })
      .on("error", (err) => reject(err));
  });
};

export const uploadvideo = async (req, res) => {
  if (req.file === undefined) {
    return res.status(404).json({ message: "Please upload an MP4 video file only" });
  }
  try {
    // Create a unique folder name using timestamp and a sanitized original name
    const folderName = Date.now() + "-" + req.file.originalname.replace(/\s/g, "_");
    const outputDir = path.join("public", "Videos", folderName);
    createFolder(outputDir);

    // Define the desired quality versions
    const qualities = [
      { label: "1080p", height: 1080 },
      { label: "720p", height: 720 },
      { label: "480p", height: 480 },
      { label: "320p", height: 320 },
    ];

    // Transcode the video into all qualities in parallel
    const transcodingPromises = qualities.map(q => transcodeVideo(req.file.path, outputDir, q));
    const results = await Promise.all(transcodingPromises);
    console.log("Transcoding complete:", results);

    // Prepare the video document data
    const file = req.file;
    const videoData = {
      videotitle: req.body.title,
      filename: file.originalname,
      filetype: file.mimetype,
      // Store the fallback/original file path (if needed)
      filepath: path.join(folderName, file.filename),
      filesize: file.size.toString(),
      videochanel: req.body.chanel,
      uploader: req.body.uploader,
      folder: folderName,
      filepath1080p: results.find(r => r.label === "1080p")?.path,
      filepath720p: results.find(r => r.label === "720p")?.path,
      filepath480p: results.find(r => r.label === "480p")?.path,
      filepath320p: results.find(r => r.label === "320p")?.path,
    };

    // Save the video document to the database
    const savedVideo = await videofile.create(videoData);
    res.status(200).json(savedVideo);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(404).json({ message: error.message });
  }
};

export const getallvideos = async (req, res) => {
  try {
    const files = await videofile.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
