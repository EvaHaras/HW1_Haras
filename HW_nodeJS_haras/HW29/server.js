import express from 'express';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use(authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
