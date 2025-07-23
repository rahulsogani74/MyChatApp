import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectToDatabase } from './utils/database.js';
import { configureApp } from './utils/configureApp.js';

// Load environment variables
dotenv.config();
const app = express();

// Configure app with middleware
configureApp(app);

// Connect to MongoDB
connectToDatabase();

// Setup routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
