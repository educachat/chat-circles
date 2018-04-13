const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const room = 'chat-circle';
let users = [];
let me = {
  id: null,
  x: null,
  y: null,
  color: null,
  username: null,
};
let cores = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

  socket.on('room', function(room) {
    socket.join(room);
    console.log('guest user connected');
  });

  socket.on('connectedUser', (username) => {
    users.push({'id': socket.id, 'username': username});
    io.emit('connectedUser', username);
    io.emit('users', users);
    console.log(`${username} entrou no chat`);
    console.log(users);
  });

  socket.on('disconnect', () => console.log('user disconnected'));

  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
    io.to(room).emit('chat message', msg);
  });

  socket.on('dragUser', (newUser) => {
    users.forEach(user => {
      (user.id === newUser.id) ? user = newUser : '';
      io.to(room).emit('dragUser', user);
    });
  });

});

http.listen(3000, () => {
  console.log('listening on http://localhost:%d', 3000);
});