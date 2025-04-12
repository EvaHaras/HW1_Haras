
  const fs = require('fs');
const path = require('path');

const logPath = path.join('utils/logger.txt');

module.exports = function logger(req, res, next) {
  const now = new Date().toISOString();
  const log = `[${now}] ${req.method} ${req.url}\n`;

  console.log(log.trim());
  fs.appendFileSync(logPath, log);

  if (next) next(); // чтобы Express пошёл дальше к следующим middleware/роутам
};
