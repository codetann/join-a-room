const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http").Server(app);
const io = require("./api/socketio");

const PORT = process.env.PORT || 5000;

/* middleware */
app.use(cors());

/* websockets */
io.connect(http, (socket) => {
  io.signIn(socket);
  io.message(socket);
  io.error(socket);
  io.disconnect(socket);
});

/* production-only */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (res, req) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

http.listen(PORT);
