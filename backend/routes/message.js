const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.post("/send", async (req, res) => {
  const { sender, receiver, text } = req.body;
  const message = new Message({ sender, receiver, text });
  await message.save();
  res.json({ message: "Message sent" });
});

router.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

module.exports = router;
