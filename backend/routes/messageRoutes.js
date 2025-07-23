const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = new Message({ sender, receiver, content });
  await message.save();
  res.status(201).send(message);
});

router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

module.exports = router;
