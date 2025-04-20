
const fs = require('fs');

const buffer = Buffer.from([0x48, 0x65, 0x6C, 0x6C, 0x6F]); 
fs.writeFileSync('sample.bin', buffer);
console.log('Файл sample.bin створено.');
