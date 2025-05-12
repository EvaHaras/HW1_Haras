import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

  res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!users.length) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, users[0].password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ userId: users[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/profile', authMiddleware, async (req, res) => {
  const [users] = await pool.query('SELECT id, email FROM users WHERE id = ?', [req.user.userId]);
  res.json(users[0]);
});

export default router;
