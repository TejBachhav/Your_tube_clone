// "use strict";
// import multer from "multer";
// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null,
//             new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//         );
//     },
// });
// const filefilter = (req,file, cb) => {
//     if (file.mimetype === "video/mp4") {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
// const upload = multer({ storage: storage, fileFilter: filefilter });
// export default upload

// IMP

// "use strict";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads"); // Folder to temporarily store uploads
//   },
//   filename: (req, file, cb) => {
//     // Replace colons with hyphens to avoid issues on Windows
//     const filename = new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
//     cb(null, filename);
//   },
// });

// const filefilter = (req, file, cb) => {
//   if (file.mimetype === "video/mp4") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: filefilter });
// export default upload;


"use strict";
import multer from "multer";
import fs from "fs";
import path from "path";

// Helper function to ensure a directory exists (creates it if missing)
export const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads"; // Folder to temporarily store uploads
    createDirectory(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Replace colons with hyphens to avoid issues on Windows
    const filename = new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
