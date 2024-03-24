import { SuBoard } from './support';
import { Board, BoardOption } from 'johnny-five';
import { config } from 'dotenv';

config();

export const comport: string = process.env.SERIAL_PORT || '/dev/ttyUSB0';
export const suBoard: SuBoard = new SuBoard();

export const defaultBoardOption: BoardOption = {
    port: comport,
    debug: false,
    repl: false,
};