const CryptoJS = require('crypto-js');

/**
* Utility function for calling DES encrypt from Crypto-JS library
* @param {string} message Message to be encrypted
* @param {string} key Secret passphrase used to generate key internally
* @returns {string} Ciphertext output from cipher
*/
function encryptDES(message, key) {
    let encrypted = CryptoJS.TripleDES.encrypt(message, key);
    return encrypted.toString();
}

module.exports = {
    encryptDES,
}