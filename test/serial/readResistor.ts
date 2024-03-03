import Firmata from 'firmata';

const board = new Firmata('/dev/ttyUSB1');

board.on('ready', () => {
    board.pinMode(0, Firmata.PIN_MODE.INPUT);

    board.analogRead(0, (val) => {
        console.log(val);
    })
})