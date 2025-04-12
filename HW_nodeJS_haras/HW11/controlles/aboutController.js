const fs = require('fs');

exports.about = (req, res) => {
    fs.readFile('views/about.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Знову не можу достукатися до файлу about.html. ДОПОМОЖІТЬ!');
          console.log({err})
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      })
};
