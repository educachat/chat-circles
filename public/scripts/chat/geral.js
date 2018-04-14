const socket = io();
let room = 'chat-circle';

let colors = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];
let me = {
  color: colors[Math.floor(Math.random() * colors.length)],
  id: null,
  room: room,
  username: null,
  x: null,
  y: null,
};

// user
// let username;
let connected = false;
let typing = false;
let lastTypingTime;

// login
let loginPage = document.querySelector('#loginPage');
let userForm = document.querySelector('#userForm');
let usernameInput = document.querySelector('#usernameInput');

// chat
let chatArea = document.querySelector('#chatArea');

onConnect = () => {
  me.id = socket.id;
  console.log('conectado ao chat');
};

onUserConnected = (user) => {
  console.log('user', user);
  if (user) {
    socket.emit('room', room);
    console.log(`${user.username} entrou na sala.`);
  }
};

onUsersListed = (users) => {
  console.log(users);
  users.map((user) => {
    let userElement = document.createElement('div');
    let userClass = `user-${user.id}`;
    console.log(userClass);
    console.log(document.querySelectorAll(`.${userClass}`));
    if (document.querySelectorAll(`.${userClass}`).length === 0) {
      userElement.classList.add('user', userClass);
      userElement.style.backgroundColor = user.color;
      if (user.id === me.id) {
        userElement.classList.add('me');
      }
      chatArea.appendChild(userElement);
      console.log(`${user.username} entrou no chat`);
    }
  });
};

onUserLeft = (user) => {
  if (user) {
    let userClass = `user-${user.id}`;
    let userElement = document.querySelector(`.${userClass}`)
    console.log(`${user.username} saiu do chat`);
    chatArea.removeChild(userElement);
  }
}







// socket.on('chat message', (msg) => {
  // $('#messages').append($('<li>').text(msg));
  // $().append($('<p>').text(msg));
  // setTimeout(() => {
  //   $('#me-123 p').hide();
  // }, 2000);
// });

// socket.on('dragUser', (user) => {
//   dragMoveSocket(user);
// });

userForm.addEventListener('submit',() => {
  event.preventDefault();
  me.username  = usernameInput.value;
  socket.emit('userAccessRoom', me);
  loginPage.style.display = 'none';
  console.log('me', me);
});

// $('form').submit(() => {
//   event.preventDefault();
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// });

socket.on('connect', onConnect);
socket.on('userConnected', onUserConnected);
socket.on('usersListed', onUsersListed);
socket.on('userLeft', onUserLeft);
