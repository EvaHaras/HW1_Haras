
const userService = require('../services/userService.js');


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    const token = await userService.login(email, password);
    
    res.status(200).json({ token });
  } catch (err) {
    console.error('Ошибка при логине:', err);
    res.status(500).json({ message: err.message });
  }
};


const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userService.createUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error('Error in getUser:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  getUser,
  login,
};
