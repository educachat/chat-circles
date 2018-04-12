const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const room = 'chat-circle';
let users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

  socket.on('room', function(room) {
    socket.join(room);
    console.log('guest user connected');
  });

  socket.on('connectedUser', (user) => {
    users.push({'id': socket.id, 'user': user});
    io.emit('connectedUser', user);
    io.emit('users', users);
    console.log(`${user} entrou no chat`);
    console.log(users);
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