/******** SERVEUR EXPRESS ******/
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static('public', { 'extensions': ['html', 'css', 'js'] }));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

/******** SOCKET ********/
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('change rooms', (data) => {
        data.actions === "join" ? socket.join(data.rooms) : socket.leave(data.rooms)
    })

    socket.on('chat message', (msg) => {
        let rooms = []
        socket.rooms.forEach(function (element){rooms.push(element)})
        io.to(rooms[1]).emit('chat message', msg);
        // io.emit('chat message', msg);
    });
});

