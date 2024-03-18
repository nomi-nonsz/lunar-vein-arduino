import http from 'node:http';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import chalk from 'chalk';

import { board, suBoard, comport } from './setup';

import { isBoardConnected } from './middleware/connection';
import view from './routes/view';
import api from './routes/api';
import socketHandler from './handlers/socketHandler';

const app = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
    cors: {
        origin: "*"
    }
}); // I have no experience at WebSocket, so.. forgive me :)

// Server configuration
const host: string = 'localhost';
const port: number = 3000;

// Express middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

// Socket.io event handlers
io.on('connection', socketHandler);

// HTTP Routes
app.use('/', view);
app.use('/api-arduino', isBoardConnected, api); // Board API Controllers

// Run server
console.log("\nRunning Server...");
server.listen(port, () => {
    console.log(`Server is connected and running in ${host} at port ${port} 🗣️🗣️🗣️`);
    console.log(`* Press ${chalk.bold(chalk.yellow("CTRL+C"))} to exit`);
    console.log(`* URL: ${chalk.bold(`http://${host}:${port}/\n`)}`);
    console.log(chalk.yellow(`Connecting to Board`));

    board.on('ready', () => {
        console.log(chalk.green(`Board at port ${comport} Connected!! ＼⁠(⁠^⁠o⁠^⁠)⁠／`));
        suBoard.connected = true;
    })

    board.on('error', (err) => {
        console.error(chalk.red("\nError while connecting to Board"));
        console.error(chalk.red(err.message));
        console.log("Enter 'rs' to try again");
    })

    board.on('exit', () => {
        console.log("Bye bye");
    })
});