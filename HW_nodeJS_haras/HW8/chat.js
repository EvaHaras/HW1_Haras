const EventEmitter = require('events');

class Chat extends EventEmitter {
  constructor() {
    super(); 
  }

  sendMessage(message) {
    console.log(`Надсилаю повідомлення: ${message}`);
    this.emit('message', message); 
  }
}

module.exports = Chat;
