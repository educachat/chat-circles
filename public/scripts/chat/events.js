/* 
 * Monitora a escrita do usuário
 */
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

/* 
 * Monitora a envio de nome do usuário
 */
userForm.addEventListener('submit',() => {
  event.preventDefault();
  me.username  = usernameInput.value;
  socket.emit('userAccessRoom', me);
  loginPage.style.display = 'none';
  // console.log('me', me);
});

/* 
 * Monitora a envio de mensagem pelo usuário
 */
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