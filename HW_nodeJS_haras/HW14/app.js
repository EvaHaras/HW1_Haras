const express = require('express');
const app = express();

const host = 'localhost';
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');



app.get('/', (req, res) => {
    res.render('products', {  products: [
        { name: 'Молоко', price: 30, available: true },
        { name: 'Хліб', price: 20, available: false },
        { name: 'Сир', price: 80, available: true },
        { name: 'Кава', price: 120, available: false },
      ]});
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});