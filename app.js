var config = require('./config/Config');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public/'));

server.listen(config.PORT, (err) => {
    if(err) { 
        throw err;
    } 
    else  {
        console.log(`Server listening on port ${config.PORT}`);
    }
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/views/messages.html');
})

io.on('connection', (socket) => {
    console.log('New Client connected!', socket.id);

    socket.on('chat_window', (message) => {
        io.emit('chat_window', message);
    });

    socket.on('userTyping', (username) => {
        io.emit('userTyping', username);
    });

    socket.on('userNotTyping', () => {
        io.emit('userNotTyping');
    });

    socket.on('disconnect', (data) => {   
        console.log(data);
        console.log(`${data.username} disconnected`);
    })
});

