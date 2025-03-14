// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";

// import videoroutes from "./Routes/video.js";
// import userroutes from "./Routes/User.js";
// import commentroutes from "./Routes/comment.js";

// // Load environment variables early
// dotenv.config();

// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use("/uploads", express.static(path.join("uploads")));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Your tube is working");
// });

// // Route handlers
// app.use(bodyParser.json());
// app.use("/user", userroutes);
// app.use("/video", videoroutes);
// app.use("/comment", commentroutes);

// // Define PORT and start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// });

// // Retrieve the DB connection URL from environment variables
// const DB_URL = process.env.DB_URL;

// if (!DB_URL) {
//   console.error("Error: DB_URL environment variable is not defined.");
//   process.exit(1); // Exit if DB_URL isn't provided
// }

// console.log("Connecting to MongoDB with URL:", DB_URL);

// mongoose.connect(DB_URL)
//   .then(() => console.log("MongoDB Database connected"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });


// IMP

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";

// import videoroutes from "./Routes/video.js";
// import userroutes from "./Routes/User.js";
// import commentroutes from "./Routes/comment.js";
// import videoStreamRoutes from "./Routes/videoStream.js"; // new streaming route

// // Load environment variables early
// dotenv.config();

// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));

// // Serve static files from 'uploads' and 'public' directories
// app.use("/uploads", express.static(path.join("uploads")));
// app.use(express.static(path.join("public")));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Your tube is working");
// });

// // Route handlers
// app.use(bodyParser.json());
// app.use("/user", userroutes);
// app.use("/video", videoroutes);
// app.use("/comment", commentroutes);
// app.use(videoStreamRoutes); // Use the streaming route for serving video files

// // Define PORT and start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// });

// // Retrieve the DB connection URL from environment variables
// const DB_URL = process.env.DB_URL;
// if (!DB_URL) {
//   console.error("Error: DB_URL environment variable is not defined.");
//   process.exit(1);
// }
// console.log("Connecting to MongoDB with URL:", DB_URL);

// mongoose.connect(DB_URL)
//   .then(() => console.log("MongoDB Database connected"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";

// import videoroutes from "./Routes/video.js";
// import userroutes from "./Routes/User.js";
// import commentroutes from "./Routes/comment.js";
// import videoStreamRoutes from "./Routes/videoStream.js"; // new streaming route
// import planRoutes from "./Routes/planRoutes.js"; // new plan upgrade routes

// // Load environment variables early
// dotenv.config();

// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));

// // Serve static files from 'uploads' and 'public' directories
// app.use("/uploads", express.static(path.join("uploads")));
// app.use(express.static(path.join("public")));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Your tube is working");
// });

// // Route handlers
// app.use(bodyParser.json());
// app.use("/user", userroutes);
// app.use("/video", videoroutes);
// app.use("/comment", commentroutes);
// app.use(videoStreamRoutes); // Use the streaming route for serving video files
// app.use("/plan", planRoutes); // Use the plan upgrade routes

// // Define PORT and start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// });

// // Retrieve the DB connection URL from environment variables
// const DB_URL = process.env.DB_URL;
// if (!DB_URL) {
//   console.error("Error: DB_URL environment variable is not defined.");
//   process.exit(1);
// }
// console.log("Connecting to MongoDB with URL:", DB_URL);

// mongoose.connect(DB_URL)
//   .then(() => console.log("MongoDB Database connected"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";

// // Import route files
// import videoroutes from "./Routes/video.js";
// import userroutes from "./Routes/User.js";
// import commentroutes from "./Routes/comment.js";
// import videoStreamRoutes from "./Routes/videoStream.js"; // new streaming route
// import planRoutes from "./Routes/planRoutes.js"; // new plan upgrade routes
// import convertRouter from "./Routes/convert.js"; // conversion route

// dotenv.config();

// const app = express();

// // Logging middleware: logs every incoming request.
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Middleware setup
// app.use(cors());
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(bodyParser.json());

// // Serve static files from 'uploads' and 'public' directories
// app.use("/uploads", express.static(path.join("uploads")));
// app.use(express.static(path.join("public")));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Your tube is working");
// });

// // Mount routes
// app.use("/user", userroutes);
// app.use("/video", videoroutes);
// app.use("/comment", commentroutes);
// app.use(videoStreamRoutes); // For streaming video files
// app.use("/plan", planRoutes); // For plan upgrade routes
// app.use("/convert", convertRouter); // For video conversion

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// });

// // Retrieve DB connection URL from environment variables
// const DB_URL = process.env.DB_URL;
// if (!DB_URL) {
//   console.error("Error: DB_URL environment variable is not defined.");
//   process.exit(1);
// }
// console.log("Connecting to MongoDB with URL:", DB_URL);

// mongoose.connect(DB_URL)
//   .then(() => console.log("MongoDB Database connected"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";

// // Import route files
// import videoroutes from "./Routes/video.js";
// import userroutes from "./Routes/User.js";
// import commentroutes from "./Routes/comment.js";
// import videoStreamRoutes from "./Routes/videoStream.js"; // streaming route
// import planRoutes from "./Routes/planRoutes.js"; // plan upgrade routes
// import convertRouter from "./Routes/convert.js"; // conversion route

// dotenv.config();

// const app = express();

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Middleware setup
// app.use(cors());
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(bodyParser.json());

// // Serve static files from 'uploads' and 'public' directories
// app.use("/uploads", express.static(path.join("uploads")));
// app.use(express.static(path.join("public")));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Your tube is working");
// });

// // Mount routes
// app.use("/user", userroutes);
// app.use("/video", videoroutes);
// app.use("/comment", commentroutes);
// app.use(videoStreamRoutes); // For streaming video files
// app.use("/plan", planRoutes); // For plan upgrade routes
// app.use("/convert", convertRouter); // For video conversion

// // Create HTTP server from Express app
// const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);

// // Set up Socket.IO signaling server on the same HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: "*", // In production, restrict to your frontend domains
//     methods: ["GET", "POST"],
//   },
// });

// // Map to store user emails to socket IDs.
// const userMap = new Map();

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Register event: client sends their email
//   socket.on("register", (email) => {
//     if (email) {
//       userMap.set(email, socket.id);
//       console.log(`User "${email}" registered with socket id: ${socket.id}`);
//     } else {
//       console.warn("Registration received without a valid email");
//     }
//   });

//   // Relay offer: data contains { toEmail, fromEmail, offer }
//   socket.on("offer", (data) => {
//     const targetSocketId = userMap.get(data.toEmail);
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("offer", { fromEmail: data.fromEmail, offer: data.offer });
//       console.log(`Relayed offer from ${data.fromEmail} to ${data.toEmail}`);
//     } else {
//       console.warn(`No target socket for user ${data.toEmail}`);
//     }
//   });

//   // Relay answer: data contains { toEmail, fromEmail, answer }
//   socket.on("answer", (data) => {
//     const targetSocketId = userMap.get(data.toEmail);
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("answer", { fromEmail: data.fromEmail, answer: data.answer });
//       console.log(`Relayed answer from ${data.fromEmail} to ${data.toEmail}`);
//     }
//   });

//   // Relay ICE candidates: data contains { toEmail, fromEmail, candidate }
//   socket.on("ice-candidate", (data) => {
//     const targetSocketId = userMap.get(data.toEmail);
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("ice-candidate", { fromEmail: data.fromEmail, candidate: data.candidate });
//       console.log(`Relayed ICE candidate from ${data.fromEmail} to ${data.toEmail}`);
//     }
//   });

//   // On disconnect, remove the socket from our user mapping.
//   socket.on("disconnect", () => {
//     for (let [email, id] of userMap.entries()) {
//       if (id === socket.id) {
//         userMap.delete(email);
//         console.log(`User "${email}" disconnected (socket id: ${socket.id})`);
//         break;
//       }
//     }
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// });

// // Retrieve the DB connection URL from environment variables
// const DB_URL = process.env.DB_URL;
// if (!DB_URL) {
//   console.error("Error: DB_URL environment variable is not defined.");
//   process.exit(1);
// }
// console.log("Connecting to MongoDB with URL:", DB_URL);

// mongoose.connect(DB_URL)
//   .then(() => console.log("MongoDB Database connected"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });


import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

// Import route files
import videoroutes from "./Routes/video.js";
import userroutes from "./Routes/User.js";
import commentroutes from "./Routes/comment.js";
import videoStreamRoutes from "./Routes/videoStream.js"; // streaming route
import planRoutes from "./Routes/planRoutes.js"; // plan upgrade routes
import convertRouter from "./Routes/convert.js"; // conversion route

dotenv.config();

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());

// Serve static files from 'uploads' and 'public' directories
app.use("/uploads", express.static(path.join("uploads")));
app.use(express.static(path.join("public")));

// Basic route
app.get("/", (req, res) => {
  res.send("Your tube is working");
});

// Mount routes
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/comment", commentroutes);
app.use(videoStreamRoutes); // For streaming video files
app.use("/plan", planRoutes); // For plan upgrade routes
app.use("/convert", convertRouter); // For video conversion

// Create HTTP server from Express app
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Set up Socket.IO signaling server on the same HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend domains
    methods: ["GET", "POST"],
  },
});

// Map to store user emails to socket IDs.
const userMap = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a client connects, they should emit a 'register' event with their email.
  socket.on("register", (email) => {
    if (email) {
      userMap.set(email, socket.id);
      console.log(`User "${email}" registered with socket id: ${socket.id}`);
    } else {
      console.warn("Registration received without a valid email");
    }
  });

  // Relay offer: data contains { toEmail, fromEmail, offer }
  socket.on("offer", (data) => {
    const targetSocketId = userMap.get(data.toEmail);
    if (targetSocketId) {
      io.to(targetSocketId).emit("offer", { fromEmail: data.fromEmail, offer: data.offer });
      console.log(`Relayed offer from ${data.fromEmail} to ${data.toEmail}`);
    } else {
      console.warn(`No target socket for user ${data.toEmail}`);
    }
  });

  // Relay answer: data contains { toEmail, fromEmail, answer }
  socket.on("answer", (data) => {
    const targetSocketId = userMap.get(data.toEmail);
    if (targetSocketId) {
      io.to(targetSocketId).emit("answer", { fromEmail: data.fromEmail, answer: data.answer });
      console.log(`Relayed answer from ${data.fromEmail} to ${data.toEmail}`);
    } else {
      console.warn(`No target socket for user ${data.toEmail}`);
    }
  });

  // Relay ICE candidates: data contains { toEmail, fromEmail, candidate }
  socket.on("ice-candidate", (data) => {
    const targetSocketId = userMap.get(data.toEmail);
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice-candidate", { fromEmail: data.fromEmail, candidate: data.candidate });
      console.log(`Relayed ICE candidate from ${data.fromEmail} to ${data.toEmail}`);
    } else {
      console.warn(`No target socket for user ${data.toEmail}`);
    }
  });

  // On disconnect, remove the user from our mapping.
  socket.on("disconnect", () => {
    for (let [email, id] of userMap.entries()) {
      if (id === socket.id) {
        userMap.delete(email);
        console.log(`User "${email}" disconnected (socket id: ${socket.id})`);
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

// Retrieve the DB connection URL from environment variables
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  console.error("Error: DB_URL environment variable is not defined.");
  process.exit(1);
}
console.log("Connecting to MongoDB with URL:", DB_URL);

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB Database connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

