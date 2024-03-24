import readline from 'node:readline/promises';
import { ReadPorts } from "./read";

export async function selectPort (): Promise<string | any> {
    const ports = await ReadPorts();

    const line = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log(`Select number of ports (0-${ports.length})`);
    ports.forEach((port, i) => {
        console.log(`${i+1}. ${port.path} - ${port.name}${port.serialNumber ? " - Recomended" : ""}`);
    })

    const selectedInput: string = await line.question("Enter number: ");
    const selectedNumber: number = Number.parseInt(selectedInput);
    const selectedPort: { name?: string, path?: string } = ports[selectedNumber-1];

    line.close();
    return selectedPort.path;
}