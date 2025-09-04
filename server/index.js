const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // Envoyer le message à tous les utilisateurs de la room (y compris l'émetteur)
    io.in(data.room).emit("receive_message", data);
    console.log(`Message from ${data.username} in room ${data.room}: ${data.message}`);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3005, () => {
  console.log("SERVER IS RUNNING");
});
