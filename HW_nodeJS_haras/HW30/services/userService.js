const pool = require('../db.js'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

JWT_SECRET='your-secret-key'

const createUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 

    const [result] = await pool.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    
    return {
      id: result.insertId,
      email: email
    };
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Failed to create user');
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM users WHERE id = ?', [id]);

    if (rows.length === 0) return null; 

    return rows[0];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw new Error('Failed to fetch user');
  }
};

const login = async (email, password) => {
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length === 0) {
    throw new Error('Пользователь не найден');
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Неверный пароль');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};
module.exports = {
  createUser,
  getUserById,
  login
};
