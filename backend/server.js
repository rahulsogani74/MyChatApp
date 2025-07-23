const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🧠 Middleware
app.use(cors());
app.use(express.json());

// 🔗 Routes
app.use('/api/auth', authRoutes);

// 🧠 MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// 💬 Socket.io logic
io.on('connection', socket => {
  console.log('🟢 New client connected');

  socket.on('send-message', ({ sender, receiver, message }) => {
    io.emit('receive-message', { sender, receiver, message });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

// 🟢 Start server
server.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
