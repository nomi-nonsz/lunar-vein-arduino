import { SuBoard } from './support';
import { Board } from 'johnny-five';

export const comport: string = '/dev/ttyUSB0';
export const board: Board = new Board({
    port: comport,
    repl: false,
    debug: false
});

export const suBoard: SuBoard = new SuBoard();