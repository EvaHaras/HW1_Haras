const http = require('http');
const url = require('url');
const routes = require("./routes/index");
const fs = require('fs')

const PORT =  3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  req.pathname = parsedUrl.pathname;
  req.query = parsedUrl.query;


  for (const route of routes) {
    const match = route.match(req.method, req.pathname);
    if (match) {
      req.params = match.params;
      return route.handler(req, res);
    }
  }

  fs.readFile('views/notFound.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Знову не можу достукатися до файлу notFound.html. ДОПОМОЖІТЬ!');
      console.log({err})
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  })
});

server.listen(PORT, () => {
  console.log(`Сервер слухає порт ${PORT}`);
});