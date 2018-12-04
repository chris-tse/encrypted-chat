const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const cryptoUtils = require('./cryptoutils');
const exphbs = require('express-handlebars');

const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);


let chatkey, computedHash;

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs'
}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: false, parameterLimit:300}));
app.use(cookieParser());
app.use(express.static('node_modules/crypto-js'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    // console.log(pw);
    res.render('login');
});

// app.post('/login', (req, res) => {
//     let {nickname, hashedPW: receivedHash} = req.body;

//     if (receivedHash === computedHash) {
//         console.log('right pw');
//         let resObj = {chatkey, PW: process.env.PW};
//         let payload = cryptoUtils.encryptDES(JSON.stringify(resObj), process.env.PW).toString();
//         // console.log('Sending encrypted:');
//         // console.log(resObj);
//         // console.log(payload);
//         return res.status(200).json({message: 'Correct password', payload});
//         // res.cookie('chatkey', encryptKey, {maxAge: 600000, httpOnly:false, overwrite: true});
//         // res.cookie('nickname', nickname, {maxAge: 600000, httpOnly:false, overwrite: true});
//         // res.redirect('/chat');
//     } else {
//         return res.status(401).json({message: 'Incorrect password'});
//     }
// });

app.get('/chat', (req, res) => {
    if (!req.cookies.password) {
        return res.redirect('/');
    }
    res.render('chat');
});

let clients = {};

io.on('connection', socket => {
    console.log('a user connected');
    clients[socket.id] = socket;
    socket.on('disconnect', () => {
        delete clients[socket.id];
        console.log('user disconnected');
    });
    
    socket.on('chat message', msg => {
        // console.log(msg);
        io.emit('chat message', msg);
    })
});


server.listen(port, () => {
    // if (process.env.PW == null || process.env.PW == '') {
    //     console.error('Set password with the PW environment variable');
    //     console.error('Example:');
    //     console.error('$ PW=<password> npm start');
    //     return process.exit(1);
    // }
    
    // let hash = crypto.createHash('SHA512');
    // hash.update(process.env.PW);
    // computedHash = hash.digest('hex');
    // chatkey = crypto.randomBytes(7).toString('hex');
    
    console.log(`Server running at http://127.0.0.1:${port}`);
    
    // Ping heroku server to keep from sleeping
    setInterval(() => {
        http.get("http://cs4173chat2.herokuapp.com/");
    }, 600000);
});