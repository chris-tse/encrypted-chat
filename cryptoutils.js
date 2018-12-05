const crypto = require('crypto');
const CryptoJS = require('crypto-js');

/**
* Utility function for calling DES encrypt from Crypto-JS library
* @param {string} message Message to be encrypted
* @param {string} key Secret passphrase used to generate key internally
* @returns {string} Ciphertext output from cipher
*/
function encryptDES(message, key) {
    let encrypted = CryptoJS.TripleDES.encrypt(message, key);
    // console.log(encryptedMsgObj.toString());
    return encrypted.toString();
}

// function saltHash(password, salt) {
//     const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
//     hash.update(password);
//     const value = hash.digest('hex');
//     return {
//         salt:salt,
//         passwordHash:value
//     };
// };

module.exports = {
    encryptDES,
}