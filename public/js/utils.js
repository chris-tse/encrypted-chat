/**
 * Utility function for calling DES encrypt from Crypto-JS library
 * @param {string} message Message to be encrypted
 * @param {string} key Secret passphrase used to generate key internally
 * @returns {string} Ciphertext output from cipher
 */
function encryptDES(message, key) {
    let encrypted = CryptoJS.TripleDES.encrypt(message, key);
    // console.log(encrypted.toString());
    return encrypted.toString();
}

/**
* Utility function for calling DES decrypt from Crypto-JS library
* @param {string} message Ciphertext to be decrypted
* @param {string} key Secret passphrase used to generate key internally
* @returns {string} Plaintext encoded in UTF-8
*/
function decryptDES(ciphertext, key) {
    let decrypted = CryptoJS.TripleDES.decrypt(ciphertext, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}