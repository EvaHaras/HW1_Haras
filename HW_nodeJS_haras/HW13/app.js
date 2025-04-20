const express = require('express');
const app = express();

const host = 'localhost';
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

const users = [
    { name: 'Іван', age: 25, email: 'ivan@example.com' },
    { name: 'Олена', age: 32, email: 'olena@example.com' },
    { name: 'Андрій', age: 40, email: 'andriy@example.com' },
  ];

app.get('/', (req, res) => {
    res.render('main', { title: 'Greetings from Pug', userList: users});
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});