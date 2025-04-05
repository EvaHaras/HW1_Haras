const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

let storedHashes = [];

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex'); // Генерація випадкової солі
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex'); // Хешування з сіллю
  return { salt, hash };
}

function checkPassword(inputPassword, storedSalt, storedHash) {
  const hash = crypto.createHmac('sha256', storedSalt).update(inputPassword).digest('hex');
  return hash === storedHash; 
}

// Створюємо сервер
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {

    fs.readFile(path.join(__dirname, 'public/index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Помилка сервера');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  }

  else if (req.method === 'POST' && req.url === '/check-password') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const params = new URLSearchParams(body);
      const inputPassword = params.get('password');

      const match = storedHashes.some(stored => checkPassword(inputPassword, stored.salt, stored.hash));

      if (!match) {
        const { salt, hash } = hashPassword(inputPassword);
        storedHashes.push({ salt, hash });
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ match }));
    });
  }
});

server.listen(3000, () => {
  console.log('Сервер запущений на http://localhost:3000');
});
