import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

//TODO: change this to the path of your app
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html')); //TODO: change this to the path of your app
})
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('👤 new message . . .', msg);
    });
    socket.on('disconnect', () => {
        console.log('✂️ user disconnected . . .')
    });
});
httpServer.listen(3001, () => {
    console.log('🚀 listening on *:3001');
});
