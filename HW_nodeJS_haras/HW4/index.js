const fs = require('fs');
const path = require('path');

const dirPath = './'; 

function findLargestFile(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.error('Помилка при зчитуванні директорії:', err);
    }

    let largestFile = null;
    let largestSize = 0;

    files.forEach(file => {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isFile()) {
        const fileSize = fs.statSync(filePath).size; 

        if (fileSize > largestSize) {
          largestSize = fileSize;
          largestFile = filePath;
        }
      }
    });

    if (largestFile) {
      console.log(`Найбільший файл: ${largestFile}, Розмір: ${largestSize} байт`);
    } else {
      console.log('Файли не знайдено.');
    }
  });
}

findLargestFile(dirPath);
