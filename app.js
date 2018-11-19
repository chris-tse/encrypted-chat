const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const cryptoUtil = require('./cryptoutil');
const exphbs = require('express-handlebars');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs'
}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: false, parameterLimit:300}));
app.use(cookieParser());
app.use(express.static('node_modules/crypto-js'));
app.use(express.static('public'));
let encryptKey;
let pw = {};

app.get('/', (req, res) => {
    console.log(pw);
    res.render('login');
});

app.post('/', (req, res) => {
    let {password} = req.body;
    const hashed = cryptoUtil.saltHash(password, pw.salt).passwordHash;
    console.log('Hashed:', hashed);
    console.log('Stored:', pw.hash);
    
    if (hashed === pw.hash) {
        console.log('right pw');
        res.cookie('chatkey', encryptKey, {maxAge: 600000, httpOnly:true, overwrite: true});
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
})

io.on('connection', socket => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('chat message', msg => {
        console.log('message:', msg);
    })
});


http.listen(3001, () => {
    let {salt, passwordHash: hash} = JSON.parse(fs.readFileSync('./password.json'));
    Object.assign(pw, {salt, hash});
    encryptKey = crypto.randomBytes(7).toString('hex');
    console.log('Server running at http://127.0.0.1:' + 3001 + '/')
});