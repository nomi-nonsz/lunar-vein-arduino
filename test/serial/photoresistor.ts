import { Board, Pin } from "johnny-five";

const board: Board = new Board({
    port: '/dev/ttyUSB0',
    debug: false,
    repl: false
});

board.on("ready", async () => {
    board.pinMode(14, Pin.INPUT);

    board.analogRead(0, (val) => {
        console.log(val);
    })
});