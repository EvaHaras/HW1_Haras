const fs = require('fs')
module.exports = function logger(req) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    fs.appendFileSync(__dirname + '/logger.txt', `\n[${now}] ${req.method} ${req.url}`);
  };