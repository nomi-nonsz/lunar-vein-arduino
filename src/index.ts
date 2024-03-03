import http from 'node:http';
import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
import chalk from 'chalk';

import { board, suBoard, comport } from './setup';

import { isBoardConnected } from './middleware/connection';
import view from './routes/view';
import api from './routes/api';

const app = express();
const server = http.createServer(app);
const io = new Server(server); // I have no experience at WebSocket, so.. forgive me :)

const host = 'localhost';
const port = 3000;

app.use(express.json());
app.use(express.static('client'));

app.use('/', view);
app.use('/api-arduino', isBoardConnected, api);

app.listen(port, host, () => {
    console.log(`Server is connected and running in ${host} at port ${port} 🗣️🗣️🗣️`);
    console.log(`Press CTRL+C to exit`);
    console.log(`URL: http://${host}:${port}/\n`);
    console.log(chalk.yellow(`Connecting to Board`));

    board.on('ready', () => {
        console.log(chalk.green(`Board at port ${comport} Connected!! ＼⁠(⁠^⁠o⁠^⁠)⁠／`));
        suBoard.connected = true;
    })

    board.on('exit', () => {
        console.log("Bye bye");
    })
});