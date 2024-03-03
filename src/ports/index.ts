import readline from 'node:readline/promises';
import { ReadPorts } from "./read";
import { board, suBoard } from '../setup';

export async function selectPort (cb: () => void) {
    const ports = await ReadPorts();

    const line =readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log(`Select number of ports (0-${ports.length})`);
    ports.forEach((port, i) => {
        console.log(`${i+1}. ${port}`);
    })

    const selectedInput: string = await line.question("Enter number: ");
    const selectedNumber: number = Number.parseInt(selectedInput);
    const selectedPort: string = ports[selectedNumber-1];

    suBoard.port = selectedPort;
    board.port = selectedPort;

    console.log(`Selected port: ${selectedPort}`);
    line.close();

    cb();
}