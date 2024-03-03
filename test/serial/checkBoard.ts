import { Board } from "johnny-five";

const board: Board = new Board({
    port: '/dev/ttyUSB0',
    debug: false,
    repl: false
});

setInterval(() => {
    console.log(board.isReady);
}, 400);