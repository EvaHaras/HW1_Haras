const express = require('express');
const app = express();
const port = process.argv[2] || 5000;

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.send(` Відповідь з Express сервера на порту ${port}`);
});

app.listen(port, () => {
    console.log(` Express сервер працює на порту ${port}`);
});
