const socket = io();
const room = 'chat-circle';

const colors = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];
let me = {
  color: colors[Math.floor(Math.random() * colors.length)],
  id: null,
  room,
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
const loginPage = document.querySelector('#loginPage');
const userForm = document.querySelector('#userForm');
const usernameInput = document.querySelector('#usernameInput');

// chat
const chatArea = document.querySelector('#chatArea');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');

onConnect = () => {
  me.id = socket.id;
  // console.log('conectado ao chat');
};

onUserConnected = (user) => {
  // console.log('user', user);
  if (user) {
    socket.emit('room', room);
    // console.log(`${user.username} entrou na sala.`);
  }
};

onUsersListed = (users) => {
  // console.log(users);
  users.map((user) => {
    let userElement = document.createElement('div');
    let userClass = `user-${user.id}`;
    // console.log(userClass);
    // console.log(document.querySelectorAll(`.${userClass}`));
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

onChatMessage = (msg) => {
  const userClass = `user-${msg.user.id}`;
  const userElement = document.querySelector(`.${userClass}`);
  const textElement = document.createElement('p');
  const { text } = msg;

  textElement.innerText = text;
  userElement.appendChild(textElement);
  setTimeout(() => {
    userElement.removeChild(textElement);
  }, (1+(0.04 * text.length))*1000);
}

onUserTyping = (user) => {
  const userClass = `user-${user.id}`;
  const userElement = document.querySelector(`.${userClass}`);
  userElement.classList.add('typing');

}

onUserTypingStop = (user) => {
  const userClass = `user-${user.id}`;
  const userElement = document.querySelector(`.${userClass}`);
  userElement.classList.remove('typing');

}

socket.on('connect', onConnect);
socket.on('userConnected', onUserConnected);
socket.on('usersListed', onUsersListed);
socket.on('userLeft', onUserLeft);
socket.on('chatMessage', onChatMessage);
socket.on('userTyping', onUserTyping);
socket.on('userTypingStop', onUserTypingStop);

socket.on('dragUser', (user) => {
  console.log(user);
  dragMoveSocket(user);
});

messageInput.addEventListener('keyup', (event) => {
  console.log(event.target.value);
  console.log(event.target.value.length);
  if (event.target.value.length > 0) {
    document.querySelector('.me').classList.add('typing');
    socket.emit('userTyping', me);
  } else {
    document.querySelector('.me').classList.remove('typing');
    socket.emit('userTypingStop', me);
  }
});

userForm.addEventListener('submit',() => {
  event.preventDefault();
  me.username  = usernameInput.value;
  socket.emit('userAccessRoom', me);
  loginPage.style.display = 'none';
  // console.log('me', me);
});

messageForm.addEventListener('submit', () => {
  event.preventDefault();
  let message = {
    user: me,
    text: messageInput.value,
  };
  // console.log(message);
  socket.emit('userSendMessage', message);
  document.querySelector('.me').classList.remove('typing');
  socket.emit('userTypingStop', me);
  messageInput.value = '';
  return false;
});
// 

