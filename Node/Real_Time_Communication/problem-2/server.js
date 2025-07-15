const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let users = {};
let messages = [];

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("userList", Object.values(users)); 
    socket.emit("chatHistory", messages);
    io.emit("chatMessage", `${username} joined the chat`);
  });

  socket.on("chatMessage", (msg) => {
    const fullMsg = `${users[socket.id]}: ${msg}`;
    messages.push(fullMsg);
    io.emit("chatMessage", fullMsg);
  });

  socket.on("adminMessage", (msg) => {
    const fullMsg = `ADMIN: ${msg}`;
    messages.push(fullMsg);
    io.emit("chatMessage", fullMsg);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    if (username) {
      io.emit("chatMessage", `${username} left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
