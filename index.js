const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*', //TODO: change in prod
        methods: ['GET', 'POST']
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

server.listen(3001, () => {
    console.log('🚀 listening on *:3001');
});
