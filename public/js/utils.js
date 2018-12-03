// Cookie utility functions from https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, time) {
    var d = new Date;
    d.setTime(d.getTime() + time);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) { setCookie(name, '', -1); }

/**
 * Utility function for calling DES encrypt from Crypto-JS library
 * @param {string} message Message to be encrypted
 * @param {string} key Secret passphrase used to generate key internally
 * @returns {string} Ciphertext output from cipher
 */
function encryptDES(message, key) {
    let encrypted = CryptoJS.DES.encrypt(message, key);
    console.log(encryptedMsgObj.toString());
    return encrypted.toString();
}

/**
* Utility function for calling DES decrypt from Crypto-JS library
* @param {string} message Ciphertext to be decrypted
* @param {string} key Secret passphrase used to generate key internally
* @returns {string} Plaintext encoded in UTF-8
*/
function decryptDES(ciphertext, key) {
    let decrypted = CryptoJS.DES.decrypt(ciphertext, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}