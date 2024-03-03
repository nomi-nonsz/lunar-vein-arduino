import Firmata from 'firmata';

const board = new Firmata('/dev/ttyUSB2');

board.on('ready', async () => {
    board.analogRead(2, (val) => {
        console.log(board.analogPins[2]);
        const output = board.pins.map((p, i) => {
            return `Pin ${i}: ${p.value}`
        }).join(", ");
    
        console.log(output);
    })

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 200));
    }
})