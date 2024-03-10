import { Board, Pin, PinMode } from "johnny-five";

const board: Board = new Board({
    port: '/dev/ttyUSB0',
    debug: true,
    repl: false
});

board.on("ready", async () => {
    board.pinMode(9, Pin.SERVO);
    board.servoWrite(9, 0);

    while (true) {
        board.servoWrite(9, 180);
        await new Promise(resolve => setTimeout(resolve, 1000));
        board.servoWrite(9, 0);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});