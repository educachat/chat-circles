// $(function () {
  const socket = io();
  let me = {
    id: null,
    x: null,
    y: null,
    color: null,
    username: null,
  };
  let room = 'chat-circle';

  // user
  let username;
  let connected = false;
  let typing = false;
  let lastTypingTime;

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
    me.id = socket.id;
    socket.emit('room', room);
    // console.log(`me: ${me}`);
  });

  // socket.on('connectedUser', (user) => {
  //   let name = $('#usernameInput').val();
  //   if (user) {
  //     console.log(`${user} entrou na sala.`);
  //   }
  // });

  socket.on('users', (users) => {
    users.map((user) => {
      if ($(`#${user.id}`).length === 0) {
        $('#chat-area').append($(`<div id="${ user.id }" class="user ${me.id === user.id ? 'me' : ''}">`));
      }
  	});
  });

  socket.on('chat message', (msg) => {
    // $('#messages').append($('<li>').text(msg));
    $().append($('<p>').text(msg));
    setTimeout(() => {
      $('#me-123 p').hide();
    }, 2000);
  });

  socket.on('dragUser', (user) => {
    dragMoveSocket(user);
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
// });