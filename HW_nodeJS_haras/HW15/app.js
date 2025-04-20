const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
const host = 'localhost';
const port = 3000;

const users = [
  { name: 'Іван', age: 25, email: 'ivan@example.com' },
  { name: 'Олена', age: 32, email: 'olena@example.com' },
  { name: 'Андрій', age: 40, email: 'andriy@example.com' },
];

app.get('/', (req, res) => {
  res.render('users.njk', { title: 'Список користувачів njk', users });
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});