import { ReadPorts } from "./read";

ReadPorts().then((ports) => {
    console.log(`${ports.length} Ports available`);
    ports.forEach((port, i) => {
        console.log((i+1) + ", " + port);
    })
})