const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const room = 'chat-circle';
let users = [];
let user = {
  color: null,
  id: null,
  room: null,
  username: null,
  x: null,
  y: null,
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

  socket.on('userAccessRoom', (user) => {
    socket.join(user.room);
    users.push(user);
    io.to(user.room).emit('usersListed', users);
  })

  socket.on('usersListed', (username) => {
    io.emit('userConnected', username);
    io.emit('usersListed', users);
    console.log(`${username} entrou no chat`);
    console.log(users);
  });

  socket.on('disconnect', () => {
    let user = users.find(x => x.id === socket.id);
    console.log(user);
    socket.broadcast.emit('userLeft', user);
  });

  socket.on('userSendMessage', (msg) => {
    console.log(`${msg.user.username} falou ${msg.text}.`);
    io.to(room).emit('chatMessage', msg);
  });

  socket.on('dragUser', (newUser) => {
    users.forEach((user) => {
      (user.id === newUser.id) ? user = newUser : '';
      io.to(room).emit('dragUser', user);
    });
  });

});

http.listen(3000, () => {
  console.log('listening on http://localhost:%d', 3000);
});