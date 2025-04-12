const socketIo = require('socket.io');

module.exports = function (server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('send_message', (msg) => {
      io.emit('receive_message', msg);  // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
