const { Transform } = require('stream');

class PasswordMasker extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    let data = chunk.toString();

    data = data.replace(/password/g, '********');

    this.push(data);

    callback();
  }
}

const masker = new PasswordMasker();

const fs = require('fs');


fs.createReadStream('input.txt')
  .pipe(masker)          
  .pipe(fs.createWriteStream('output.txt'));  