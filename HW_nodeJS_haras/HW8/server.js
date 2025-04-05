const http = require('http');
const fs = require('fs');
const path = require('path');
const Chat = require('./chat'); 

const myChat = new Chat();

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Помилка сервера');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (req.url.startsWith('/public/')) {
      const filePath = path.join(__dirname, req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Файл не знайдено');
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
    }
  } else if (req.method === 'POST' && req.url === '/send') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const params = new URLSearchParams(body);
      const message = params.get('message');
      if (message) {
        myChat.sendMessage(message); 
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: message }));
    });
  }
});

myChat.on('message', (message) => {
  console.log(`Отримано повідомлення: ${message}`);
});

server.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000');
});
