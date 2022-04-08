const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

const {MessageType2} = require('./Models/MessageType2');

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    // res.send(__dirname);
});
app.get('/1', (req, res) => {
    res.sendFile(__dirname + '/room1.html');
    // res.send(__dirname);
});

app.post('/post',function (req, res){
    
    try {
        var postMessage = new MessageType2(req.body);

        // req.emit("message", JSON.stringify(postMessage));
        console.log(postMessage);
        io.to(postMessage.room).emit("message", postMessage.name + ' : ' + postMessage.message);
        // res.send(JSON.stringify(req.body));
        res.send(JSON.stringify(postMessage));    
    } catch (error) {
        res.send(error);
    }
    
});


io.on("connection", (socket) => {
    console.log('User Connected');

    socket.on('roomId', roomId =>{
        io.emit('roomId',roomId);
        console.log(roomId);


        console.log(socket.rooms);
    })

    socket.on('message', async message =>{

        var newMessage = new MessageType2(JSON.parse(message));


        // newMessage.fill(message);

        console.log(newMessage);

        // var jsonValue = JSON.parse(message);
        // console.log(jsonValue);

        await socket.join(newMessage.room);

        if( newMessage.message != 'connection' ){
            // var sendingMessage = newMessage.name + ' : ' + newMessage.message;
            socket.to(newMessage.room).emit("message", newMessage.name + ' : ' + newMessage.message);
        }

    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});