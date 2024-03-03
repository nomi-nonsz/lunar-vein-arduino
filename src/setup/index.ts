import Firmata from 'firmata';
import { SuBoard } from './support';

export const comport: string = '/dev/ttyUSB1';
export const board: Firmata = new Firmata(comport);

export const suBoard: SuBoard = new SuBoard();