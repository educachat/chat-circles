/* 
 * Classe de Usuários do Chat
 */
class User {

  constructor(
    id,
    color,
    room,
    username,
    x,
    y,
  ) {
    this._id = id;
    this._color = color;
    this._room = room;
    this._username = username;
    this._x = x;
    this._y = y;
  }

  talk(message) {
    return message;
  }
}



