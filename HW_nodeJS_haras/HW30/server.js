const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users.js');

dotenv.config();

const app = express();
app.use(express.json()); 
app.use('/api', userRoutes); 

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
