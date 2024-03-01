const Firmata = require('firmata');
const board = new Firmata('/dev/ttyUSB0');

board.on('ready', async () => {
    const led = 12;

    board.pinMode(led, board.MODES.OUTPUT);

    let state = board.LOW;

    board.digitalWrite(led, board.HIGH);

    state = board.pins[led].value;

    while (true) {
        console.log(state);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});