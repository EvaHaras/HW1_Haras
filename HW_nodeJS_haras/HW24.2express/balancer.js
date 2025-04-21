const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const ports = [5000, 5001, 5002];
let current = 0;

const server = http.createServer((req, res) => {
    const target = `http://localhost:${ports[current]}`;
    console.log(` Перенаправлення до: ${target}`);

    proxy.web(req, res, { target });

    current = (current + 1) % ports.length;
});

server.listen(3000, () => {
    console.log(' Балансувальник Express серверів на порту 3000');
});
