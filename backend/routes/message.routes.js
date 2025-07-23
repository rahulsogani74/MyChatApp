import express from 'express';
import Message from '../models/Message.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { sender, content } = req.body;
  const message = new Message({ sender, content });
  await message.save();
  res.json(message);
});

router.get('/', async (req, res) => {
  const messages = await Message.find().populate('sender');
  res.json(messages);
});

export default router;
