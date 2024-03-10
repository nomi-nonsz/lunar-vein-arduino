import { Board, Piezo } from "johnny-five";

const board = new Board({
    port: '/dev/ttyUSB0',
    repl: false
});

board.on('ready', () => {
    const piezo = new Piezo(11);
    
    let ins = 0;
    
    board.loop(500, async () => {
        piezo.play({
            song: "C4",
            beats: 1/2,
            tempo: 100
        })
        await new Promise(resolve => setTimeout(resolve, 100));
        piezo.note("C4", 100);
        await new Promise(resolve => setTimeout(resolve, 100));
        piezo.tone(262 * 7.3, 100);
    })
})