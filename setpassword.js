const fs = require('fs');
const args = require('yargs').argv;
const cryptoutil = require('./cryptoutil');

const password = args.pw;
const salt = cryptoutil.genRandomString(64);
const data = cryptoutil.saltHash(password, salt);
fs.writeFile('./password.json', JSON.stringify(data, null, 4), err => {
    if (err) {
        console.error('Could not write to password.json');
        console.error(err);
    }
    console.log("Wrote password hash and salt to password.json");
});