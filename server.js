const express = require('express');
const app = express();
const server = app.listen("8000");
const io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

io.sockets.on("connection", function(socket) {
    socket.on("send", function(data) {
        io.sockets.emit("getMessage", data);
        var veri = { message: data.message, sender: data.username };
        console.log(veri);
    });
});