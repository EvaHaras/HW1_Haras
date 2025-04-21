const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Кількість доступних CPU ядер: ${numCPUs}`);
    console.log(`Створення ${numCPUs} воркерів...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Воркер ${worker.process.pid} завершив роботу. Створення нового...`);
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Привіт від воркера ${process.pid}!\n`);
    }).listen(3000);

    console.log(`Воркер ${process.pid} слухає порт 3000`);
}
