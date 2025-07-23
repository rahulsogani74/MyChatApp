import express from 'express';
import User from '../models/User.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  res.json(user);
});

export default router;
