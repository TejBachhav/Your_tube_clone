import { Server } from "socket.io";

const io = new Server(5002, {
  cors: {
    origin: "*",  // Allow all origins; adjust for production.
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Relay offer to the intended recipient.
  socket.on("offer", (data) => {
    // data: { to, offer }
    io.to(data.to).emit("offer", { from: socket.id, offer: data.offer });
  });

  // Relay answer.
  socket.on("answer", (data) => {
    // data: { to, answer }
    io.to(data.to).emit("answer", { from: socket.id, answer: data.answer });
  });

  // Relay ICE candidates.
  socket.on("ice-candidate", (data) => {
    // data: { to, candidate }
    io.to(data.to).emit("ice-candidate", { from: socket.id, candidate: data.candidate });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

console.log("Signaling server running on port 5002");
