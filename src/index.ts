import express, { Request, Response } from 'express';
import { board, comport } from './setup';
import view from './routes/view';
import api from './routes/api';

const app = express();

const host = 'localhost';
const port = 3000;

app.use(express.static('client'));

app.use('/', view);
app.use('/api-arduino', api);

app.listen(port, host, () => {
    console.log(`Server is running in ${host} at port ${port} 🗣️🗣️🗣️`);
    console.log(`URL: http://${host}:${port}/\n`);
    console.log("Connecting to Board");

    board.on('ready', () => {
        console.log(`Board at port ${comport} Connected!! ＼⁠(⁠^⁠o⁠^⁠)⁠／`);
    })
});