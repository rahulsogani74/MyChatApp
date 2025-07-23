import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.json(messages);
};

export const postMessage = async (req, res) => {
  const { sender, content } = req.body;
  const message = new Message({ sender, content });
  await message.save();
  res.status(201).json(message);
};
