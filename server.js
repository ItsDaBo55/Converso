const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Adjust as needed
        methods: ["GET", "POST"]
    },
    pingTimeout: 60000, // Increase the ping timeout to 60 seconds
    pingInterval: 25000 // Adjust the ping interval as needed
});

app.use(cors({
    origin: '*', // Allow any origin for now
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.get('/', (req, res) => {
    console.log("Server is running on 3000")
    res.send('Hello World!');
});
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

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