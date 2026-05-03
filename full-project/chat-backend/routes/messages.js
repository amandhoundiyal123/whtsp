import express from "express";
import Message from "../models/Message.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// GET /api/messages/:receiverId — fetch conversation between two users
router.get("/:receiverId", verifyToken, async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.userId;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // oldest first

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/messages — send a new message
router.post("/", verifyToken, async (req, res) => {
  const { receiverId, text, img } = req.body;

  try {
    const message = await Message.create({
      senderId: req.userId,
      receiverId,
      text,
      img,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
