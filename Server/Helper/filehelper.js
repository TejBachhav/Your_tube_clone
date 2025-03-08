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

"use strict";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Folder to temporarily store uploads
  },
  filename: (req, file, cb) => {
    // Replace colons with hyphens to avoid issues on Windows
    const filename = new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
    cb(null, filename);
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });
export default upload;
