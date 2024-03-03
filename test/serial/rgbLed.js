const { Board, Led } = require("johnny-five");

const board = new Board({
    port: '/dev/ttyUSB0',
    repl: false,
    debug: false
})

board.on('ready', () => {
    const led = new Led.RGB([7, 6, 5]);

    let ins = 252;
    board.loop(10, () => {
        led.color("#0000FF");
        led.intensity(ins);
        ins--;
        if (ins < 1) {
            ins = 255;
        }
    })

    board.analogRead(0, (val) => {
        console.log(val);
    })
});