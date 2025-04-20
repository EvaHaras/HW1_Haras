const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Привіт із бекенда!' });
});

app.listen(PORT, () => {
  console.log(`🟢 Backend працює на порту ${PORT}`);
});
