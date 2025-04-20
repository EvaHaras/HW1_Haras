const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Привіт з Docker контейнера!\n');
});

server.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
