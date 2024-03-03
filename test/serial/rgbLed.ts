import { Board, Led } from "johnny-five";

const board = new Board({
    port: '/dev/ttyUSB0',
    repl: false,
    debug: false
})

board.on('ready', () => {
    const led = new Led.RGB({
        pins: {
            red: 7,
            green: 6,
            blue: 5,
        },
        isAnode: true
    })

    let ins = 100;

    board.loop(10, () => {
        led.intensity(ins);
        ins--;
        if (ins < 1) {
            ins = 100;
        }
    })
});