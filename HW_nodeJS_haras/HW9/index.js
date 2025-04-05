const fs = require('fs');

const readStream = fs.createReadStream('log.txt', { highWaterMark: 1024 }); // 1 KB за замовчуванням

readStream.on('data', (chunk) => {
  console.log('Читання чанку:', chunk.toString()); // Перетворюємо чанк на строку для читання
});

readStream.on('end', () => {
  console.log('Читання файлу завершено');
});

readStream.on('error', (err) => {
  console.error('Помилка при читанні файлу:', err);
});
