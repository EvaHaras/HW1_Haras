const crypto = require('crypto');
const fs = require('fs');

const filePath = 'helloWorld.txt';
const fileBuffer = fs.readFileSync(filePath);

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const sign = crypto.createSign('SHA256');
sign.update(fileBuffer);
const signature = sign.sign(privateKey);

const verify = crypto.createVerify('SHA256');
verify.update(fileBuffer);
const isVerified = verify.verify(publicKey, signature);

console.log('Перевірка підпису:', isVerified ? 'успішно' : 'не вдалося');
