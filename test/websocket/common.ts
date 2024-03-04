import http from 'node:http';
import express from 'express';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Connected");

    socket.on("message", (message) => {
        console.log(message);
    })
})

server.listen(3001, "localhost", () => {
    console.log("Common server is running");
})