const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mychatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

const UserSchema = new mongoose.Schema({ username: String });
const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);

app.post('/api/login', async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username });
  if (!user) user = await User.create({ username });
  res.json({ user });
});

app.get('/api/messages', async (req, res) => {
  const { from, to } = req.query;
  const messages = await Message.find({
    $or: [
      { sender: from, receiver: to },
      { sender: to, receiver: from }
    ]
  }).sort({ timestamp: 1 });
  res.json({ messages });
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('send-message', async (data) => {
    const { sender, receiver, message } = data;
    const saved = await Message.create({ sender, receiver, message });
    io.emit('receive-message', saved);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
