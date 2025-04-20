const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample.bin');

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Помилка при читанні файлу:', err);
    return;
  }

  console.log('📦 Buffer:', data);

  console.log('\n🔢 Hex:', data.toString('hex'));

  console.log('\n📃 Text (utf8):', data.toString('utf8'));
});
