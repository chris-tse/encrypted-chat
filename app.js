const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

// Set default port if needed
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

// Express handlebars boilerplate
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs'
}));

// Make module visible from client-side friendly URL
app.use(express.static('node_modules/crypto-js'));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/chat', (req, res) => {
    res.render('chat');
});

let clients = {};

io.on('connection', socket => {
    console.log('a user connected');
    clients[socket.id] = socket;
    socket.on('disconnect', () => {
        delete clients[socket.id]; // Delete users on disconnect to prevent memory leak
        console.log('user disconnected');
    });
    
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    })
});


server.listen(port, () => {
    // Development use only
    console.log(`Server running at http://127.0.0.1:${port}`);
    
    // Ping heroku server to keep from sleeping
    setInterval(() => {
        http.get("http://cs4173chat2.herokuapp.com/");
    }, 600000);
});