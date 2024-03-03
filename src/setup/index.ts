import { SuBoard } from './support';
import { Board } from 'johnny-five';
import { config } from 'dotenv';

config();

export const comport: string = process.env.SERIAL_PORT || '/dev/ttyUSB0';
export const suBoard: SuBoard = new SuBoard();

export const board: Board | null = new Board({
    port: comport,
    repl: false,
    debug: false
});