var config = require('./config/Config');
var app = require('express')();
var http = require('http');

var server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(config.PORT, (err) => {
    if(err) { 
        throw err;
    } 
    else  {
        console.log(`Server listening on port ${config.PORT}`);
    }
});
