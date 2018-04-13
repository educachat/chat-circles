$(function () {
  const socket = io();
  let me;
  let room = 'chat-circle';

  // user
  let username;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  let cores = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

	getParticipants = () => {

	}

  addParticipantsMessage = (data) => {
    let message = '';
    if (data.numUsers === 1) {
      message += 'primeiro participante';
    } else {
      message += 'este é o ${data.numUsers} participante';
    }

    log(message);
  };

  setUsername = () => { };

  sendMessage = () => { };

  addMessage = () => { };

  enviaMensagem = () => { };

  log = (message, options) => {
    // let
  };

  socket.on('connect', () => {
    me = socket.id;
    socket.emit('room', room);
    // console.log(`me: ${me}`);
  });

  socket.on('connectedUser', (user) => {
    let name = $('#usernameInput').val();
    if (user) {
      console.log(`${user} entrou na sala.`);
    }
  });

  socket.on('users', (users) => {
    users.map((user) => {
      if ($(`#${user.id}`).length === 0) {
        $('#chat-area').append($(`<div id="${ user.id }" class="user ${me === user.id ? 'me' : ''}">`));
      }
  		console.log(user);
  	});
  });

  socket.on('chat message', (msg) => {
    // $('#messages').append($('<li>').text(msg));
    $().append($('<p>').text(msg));
    setTimeout(() => {
      $('#me-123 p').hide();
    }, 2000);
  });

  $('#userForm').submit(() => {
    event.preventDefault();
    let name = $('#usernameInput').val();
    socket.emit('connectedUser', name);
    $('.login').fadeOut();
  });

  $('form').submit(() => {
    event.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
});