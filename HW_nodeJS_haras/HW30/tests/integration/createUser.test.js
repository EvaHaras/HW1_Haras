const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/users.js');
const pool = require('../../db.js');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

beforeAll(async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )`);
});

afterEach(async () => {
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
   await pool.query('DROP TABLE IF EXISTS orders');
await pool.query('DROP TABLE IF EXISTS users');
  await pool.end();
});

describe('POST /api/users', () => {
  it('створює користувача і повертає id, email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('test@example.com');

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', ['test@example.com']);
    expect(users.length).toBe(1);
  });
});
