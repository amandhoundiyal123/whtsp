import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// ✅ Allow all origins (for deployment)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "*" }));
app.use(express.json());

// REST routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Track online users
const onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("sendMessage", ({ receiverId, message }) => {
    const receiverSocket = onlineUsers[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", message);
    }
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    if (userId) delete onlineUsers[userId];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

// ✅ Use Render PORT (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("⚠️  Server will still start, but DB-dependent routes will fail.");
  });

// ✅ Start server regardless of DB status
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);