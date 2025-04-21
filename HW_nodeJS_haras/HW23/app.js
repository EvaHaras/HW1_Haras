const { Worker } = require('worker_threads');

function runWorker(number) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: number
        });

        worker.on('message', result => {
            console.log(`Факторіал числа ${number} = ${result}`);
            resolve(result);
        });

        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0)
                reject(new Error(` Воркер завершився з кодом ${code}`));
        });
    });
}

const number = 100_000n; 
console.log(` факторіал ${number} у воркері...`);

runWorker(number).then(() => {
    console.log('Завершено!');
}).catch(err => {
    console.error(err);
});
