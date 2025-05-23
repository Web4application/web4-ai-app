const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Web4 AI App API is running!');
});

// Socket.io integration
io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('send_message', (message) => {
    io.emit('receive_message', message);  // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
