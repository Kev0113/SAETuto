const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
  });

let name = ""

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});

io.on('connection', (socket) => {
    console.log(socket.rooms)
    socket.on('rooms', (data) => {
        if(data.action === "join"){
            socket.join(data.rooms)
        }
        if(data.action === "leave"){
            socket.leave(data.rooms)
        }
        let tab = []
        socket.rooms.forEach(function(element){
            tab.push(element)
        })
        socket.emit('changeTitleRooms', tab[1])
    })

    socket.on('chat message', (msg) => {
        io.to('Salle 1').emit('chat message', msg);
        // socket.to('4r-qY9Nycmjy0T2YAAAH').emit("chat message", socket.id, msg);
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
