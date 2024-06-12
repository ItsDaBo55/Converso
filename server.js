const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = [];

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('join', data => {
        socket.username = data.username;
        socket.country = data.country;
        users.push(socket);
        matchUsers();
    });

    socket.on('offer', (id, description) => {
        socket.to(id).emit('offer', socket.id, description);
    });

    socket.on('answer', (id, description) => {
        socket.to(id).emit('answer', description);
    });

    socket.on('candidate', candidate => {
        socket.broadcast.emit('candidate', candidate);
    });

    socket.on('mute', data => {
        socket.broadcast.emit('mute', data);
    });

    socket.on('skip', () => {
        const index = users.indexOf(socket);
        if (index > -1) {
            users.splice(index, 1);
        }
        matchUsers();
    });

    socket.on('privateMessage', data => {
        socket.broadcast.emit('privateMessage', data);
    });

    socket.on('globalMessage', data => {
        io.emit('globalMessage', data);
    });

    socket.on('leave', () => {
        const index = users.indexOf(socket);
        if (index > -1) {
            users.splice(index, 1);
        }
        matchUsers();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        const index = users.indexOf(socket);
        if (index > -1) {
            users.splice(index, 1);
        }
    });
});

function matchUsers() {
    if (users.length >= 2) {
        const [user1, user2] = users;
        users = users.slice(2);

        user1.emit('offer', user2.id, user2);
        user2.emit('offer', user1.id, user1);
    }
}

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
