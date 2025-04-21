const http = require('http');
const port = process.argv[2] || 4000;

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.writeHead(200);
    res.end(`Відповідь з сервера на порту ${port}\n`);
}).listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
