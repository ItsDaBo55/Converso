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
    });

    socket.on('offer', (data) => {
        socket.to(data.to).emit('offer', { from: socket.id, description: data.description });
    });

    socket.on('answer', (data) => {
        socket.to(data.to).emit('answer', { from: socket.id, description: data.description });
    });

    socket.on('candidate', (data) => {
        socket.to(data.to).emit('candidate', { candidate: data.candidate });
    });

    socket.on('mute', (data) => {
        socket.to(data.to).emit('mute', data);
    });
    
    socket.on('skip', () => {
        const index = users.indexOf(socket);
        if (index > -1) {
            users.splice(index, 1);
        }
        matchUsers();
    });

    socket.on('privateMessage', (data) => {
        socket.to(data.to).emit('privateMessage', data); // Send private message to the specific user
    });

    socket.on('globalMessage', (data) => {
        io.emit('globalMessage', data);
    });

    socket.on('leave', (data) => {
        const index = users.indexOf(socket);
        if (index > -1) {
            users.splice(index, 1);
        }
        socket.to(data.other).emit('left'); // Notify the other user that this user has left
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

        user1.emit('matched', {id: user2.id, username: user2.username, country: user2.country, avatar: user2.avatar});
        user2.emit('matched', {id: user1.id, username: user1.username, country: user1.country, avatar: user1.avatar});

        users = users.slice(2); // Remove matched users from the array
    }
}
