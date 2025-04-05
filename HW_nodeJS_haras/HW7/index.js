const crypto = require('node:crypto');

const hashPassword = (password)=>{
    const hash = crypto.hash('SHA-256', password)
    return hash
}
const password = 'test'
const testHashPassword = hashPassword(password)

console.log({password, testHashPassword})