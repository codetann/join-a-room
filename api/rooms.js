let rooms = [];

/* adds user to the rooms array */
function add(roomId, userId, username, socketId) {
  let found = false;
  let index = 0;

  // checks to see if the there is currently a room under the roomId
  rooms.forEach((room, i) => {
    if (room.roomId === roomId) {
      found = true;
      index = i;
    }
  });

  // if there is a current room, it adds the user to it, else it creates a new room
  if (found) {
    rooms[index].members.push({
      userId,
      username,
      socketId,
    });
  } else {
    rooms.push({
      roomId: roomId,
      members: [{ userId, username, socketId }],
    });
  }
}

/* removes user from rooms array && return the removed user info */
function remove(socketId) {
  if (rooms.length < 1) return { error: "No user found" };

  let user;

  rooms.forEach((room) => {
    room.members.forEach((member, i) => {
      if (member.socketId === socketId) {
        user = { username: member.username, roomId: room.roomId };
        room.members.splice(i, 1);
      }
    });
  });

  if (user) {
    return user;
  } else {
    return { error: "No user found" };
  }
}

module.exports = {
  add,
  remove,
};
