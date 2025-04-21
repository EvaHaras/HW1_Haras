const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const ports = [4000, 4001, 4002];
let current = 0;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    const target = `http://localhost:${ports[current]}`;
    console.log(`📤 Перенаправлення запиту до: ${target}`);

    proxy.web(req, res, { target });

    current = (current + 1) % ports.length;
});

server.listen(3000, () => {
    console.log(' Балансувальник працює на порту 3000');
});
