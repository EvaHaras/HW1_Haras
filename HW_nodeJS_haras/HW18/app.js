const message = 'Hello world';

const buffer = Buffer.from(message, 'utf8');

console.log('📦 Buffer (raw):', buffer);
console.log('🔢 Hex:', buffer.toString('hex'));
console.log('📄 Binary (8-біт):');
for (const byte of buffer) {
  process.stdout.write(byte.toString(2).padStart(8, '0') + ' ');
}
console.log('\n');

const restored = buffer.toString('utf8');

console.log('🔁 Відновлений текст:', restored);
