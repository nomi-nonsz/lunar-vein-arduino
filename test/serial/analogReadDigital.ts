import Firmata, { PIN_MODE, PIN_STATE } from 'firmata';

const board = new Firmata('/dev/ttyUSB2');

board.on('ready', async () => {
    // board.analogWrite(0, 255);
    // board.analogWrite(1, 255);
    // board.analogWrite(2, 255);

    board.analogRead(0, (val) => {
        console.log(val);
    })

    while (true) {
        await new Promise (resolve => setTimeout(resolve, 90));
    }
})