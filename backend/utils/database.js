import mongoose from 'mongoose';

export const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ Mongo Error:', err));
};
