
 const createUser = async (email, password) => {
  const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
  return result.insertId;
};

 const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserById
};
