const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
  });
  
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});

io.on('connection', (socket) => {
    socket.on('honorine', (roomName) => {
        socket.join(roomName);
        console.log(`Un utilisateur a rejoint la salle: ${roomName}`);
    });

    socket.on('leave room', (roomName) => {
        socket.leave(roomName);
        console.log(`Un utilisateur a quitter la salle: ${roomName}`);
    });

    socket.on('chat message', (msg) => {
        io.to('Salle 1').emit('chat message', msg);
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  