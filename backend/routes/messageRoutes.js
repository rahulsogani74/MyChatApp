const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Send a new message
router.post("/", authMiddleware, async (req, res) => {
  const { receiver, text } = req.body;
  try {
    const message = await Message.create({
      sender: req.user.id,
      receiver,
      text,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
});

// ✅ Get all messages between current user and another user
router.get("/:userId", authMiddleware, async (req, res) => {
  const userId = req.params.userId;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 }); // Sort oldest to newest
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

module.exports = router;
