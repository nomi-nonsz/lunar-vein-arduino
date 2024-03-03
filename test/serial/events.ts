import { Board } from "johnny-five";

const board: Board = new Board({
    port: '/dev/ttyUSB1',
    debug: false,
    repl: false
});

board.on('ready', () => {
    console.log("Board is ready");
})

board.on('close', () => {
    console.log("Board is close");
})

board.on('connect', () => {
    console.log("Board is connect");
})

board.on('exit', () => {
    console.log("Board is exit");
})

board.on('fail', () => {
    console.log("Board is fail");
})