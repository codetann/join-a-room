const socketio = require("socket.io");
const rooms = require("./rooms");

let io;

/* create initial socket/connection */
const connect = (http, callback) => {
  io = socketio(http);

  io.sockets.on("connection", (socket) => {
    callback(socket);
  });
};
/* sign-in socket */
const signIn = (socket) => {
  const channel = "sign-in";

  socket.on(channel, (data) => {
    const { roomId, userId, username } = data;

    rooms.add(roomId, userId, username, socket.id);
    socket.join(data.roomId);

    io.sockets.in(roomId).emit(channel, {
      userId: "admin",
      message: "A new user has joined the chat!",
    });
  });
};
/* message socket */
const message = (socket) => {
  const channel = "message";

  socket.on(channel, (data) => {
    const { roomId, message, userId, username } = data;
    io.sockets.in(roomId).emit(channel, { userId, message, username });
  });
};
const error = (socket) => {
  socket.on("error", (error) => {
    console.log(error);
  });
};
/* disconnect socket */
const disconnect = (socket) => {
  socket.on("disconnect", () => {
    const { username, roomId, error } = rooms.remove(socket.id);

    if (error) return;

    io.sockets.in(roomId).emit("disconnection", {
      userId: "admin",
      message: `${username} has disconnected`,
    });
  });
};

module.exports = {
  connect,
  signIn,
  message,
  error,
  disconnect,
};
