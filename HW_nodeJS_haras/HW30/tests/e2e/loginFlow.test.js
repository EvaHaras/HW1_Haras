const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/users.js');
const pool = require('../../db.js');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('E2E login flow', () => {
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

  it('створення → логін → доступ до /profile', async () => {
    const email = 'user@example.com';
    const password = '123456';

    await request(app).post('/api/users').send({ email, password });

    const loginRes = await request(app).post('/api/login').send({ email, password });
    expect(loginRes.statusCode).toBe(200);
    const token = loginRes.body.token;
    expect(token).toBeDefined();

    const profileRes = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(profileRes.statusCode).toBe(200);

    const noAuthRes = await request(app).get('/api/profile');
    expect(noAuthRes.statusCode).toBe(401);
  });
});
