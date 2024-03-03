import Firmata from 'firmata';
import { Board, Pin, PinMode } from "johnny-five";

const board = new Board({
    port: '/dev/ttyUSB0',
    repl: false
});

board.on('ready', () => {
    board.pinMode(13, Pin.OUTPUT);

    board.digitalWrite(13, 1);
})