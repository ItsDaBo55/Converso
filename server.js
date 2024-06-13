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
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

let users = [];

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('join', data => {
        socket.username = data.username;
        socket.country = data.country;
        socket.avatar = data.avatar;
        users.push(socket);
        matchUsers();
        io.emit('userJoined', { username: socket.username, country: socket.country });
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
        socket.to(data.to).emit('privateMessage', data); // Send private message to the specific user
    });

    socket.on('globalMessage', data => {
        io.emit('globalMessage', data);
    });

    socket.on('leave', () => {
        const index = users.indexOf(socket);
        if (index > -1) {
            users.splice(index, 1);
        }
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
    while (users.length >= 2) {
        const user1 = users[0];
        const user2 = users[1];

        user1.emit('offer', user2.id, {});
        user2.emit('offer', user1.id, {});

        users = users.slice(2); // Remove matched users from the array
    }
}
