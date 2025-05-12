const express = require('express');
const { register, getUser, login } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', register);
router.get('/users/:id', getUser);
router.post('/login', login);

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ id: req.user.id, email: req.user.email });
});

module.exports = router;
