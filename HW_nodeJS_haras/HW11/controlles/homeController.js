const fs = require('fs');

exports.home = (req, res) => {
    fs.readFile('views/home.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Знову не можу достукатися до файлу home.html. ДОПОМОЖІТЬ!');
          console.log({err})
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      })
};
