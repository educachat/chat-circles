const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const room = 'chat-circle';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

  socket.on('room', function(room) {
    socket.join(room);
    console.log('a user connected');
  });

  socket.on('connectedUser', (users) => {
    socket.name = users;
    io.emit('connectedUser', users);
    console.log(`${users} entrou no chat`);
  });

  socket.on('disconnect', () => console.log('user disconnected'));

  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
    io.to(room).emit('chat message', msg);
  });

});

http.listen(3000, () => {
  console.log('listening on http://localhost:%d', 3000);
});