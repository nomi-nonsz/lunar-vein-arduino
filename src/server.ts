import http from 'node:http';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import chalk from 'chalk';

import { suBoard, comport } from './setup';
import { cfg } from './setup/config';

import { isBoardConnected } from './middleware/connection';
import view from './routes/view';
import api from './routes/api';
import socketHandler from './handlers/socketHandler';

const app = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
    cors: {
        origin: cfg.server.cors
    }
}); // I have no experience at WebSocket, so.. forgive me :)

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
export function run () {
    const { board } = suBoard;
    const { port, host } = cfg.server;

    try {

        if (!board) {
            throw new Error("Failed to use API, process canceled. No new API boards have been declared as of yet");
        }

        console.log("\nRunning Server...");
        server.listen(port, () => {
            console.log(`Server is connected and running in ${host} at port ${port} 🗣️🗣️🗣️`);
            console.log(`* Enter ${chalk.bold(chalk.yellow("rs"))} to restart`);
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
    } catch (err) {
        console.error("Fatal error. ", err);
    }
}