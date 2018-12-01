const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const cryptoUtil = require('./cryptoutil');
const exphbs = require('express-handlebars');

const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);


let encryptKey;

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

let pw = {};

app.get('/', (req, res) => {
    console.log(pw);
    res.render('login');
});

app.post('/', (req, res) => {
    let {nickname, password} = req.body;
    const hashed = cryptoUtil.saltHash(password, pw.salt).passwordHash;
    console.log('Hashed:', hashed);
    console.log('Stored:', pw.hash);
    
    if (hashed === pw.hash) {
        console.log('right pw');
        res.cookie('chatkey', encryptKey, {maxAge: 600000, httpOnly:false, overwrite: true});
        res.cookie('nickname', nickname, {maxAge: 600000, httpOnly:false, overwrite: true});
        res.redirect('/chat');
    } else {
        console.log('wrong pw');
        res.redirect('/');
    }
});

app.get('/chat', (req, res) => {
    if (req.cookies.chatkey !== encryptKey) {
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
        console.log(msg);
        io.emit('chat message', msg);
    })
});


server.listen(port, () => {
    // setInterval(() => http.get('http://cs4173chat.herokuapp.com/'), 10000);
    let salt = cryptoUtil.genRandomString(64);
    if (process.env.PW == null || process.env.PW == '') {
        console.error('Set password with the PW environment variable');
        return process.exit(1);
    }
    let pass = process.env.PW;
    let hash = cryptoUtil.saltHash(process.env.PW, salt).passwordHash;
    Object.assign(pw, {salt, hash});
    encryptKey = crypto.randomBytes(7).toString('hex');
    console.log(`Server running at http://127.0.0.1:${port}`);
    setInterval(() => {
        http.get("http://cs4173chat.herokuapp.com/");
    }, 600000);
});