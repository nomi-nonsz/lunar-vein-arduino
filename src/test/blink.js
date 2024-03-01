const Firmata = require('firmata');
const board = new Firmata('/dev/ttyUSB0');

board.on('ready', async () => {
    const led = 12;

    board.pinMode(led, board.MODES.OUTPUT);

    while (true) {
        board.digitalWrite(led, board.HIGH);
        console.log("ON");
        await new Promise(resolve => setTimeout(resolve, 300));
        board.digitalWrite(led, board.LOW);
        console.log("OFF");
        await new Promise(resolve => setTimeout(resolve, 300));
    }
});