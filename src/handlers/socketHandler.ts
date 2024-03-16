import { Socket } from "socket.io";
import { Pin, Sensor } from "johnny-five";
import { board } from "../setup";

export default (socket: Socket) => {
    console.log(`${socket.id} | ${socket.client.request.headers.host} | Joined`);

    socket.on("servo", (p: string, ang: string, cb?: (msg?: string) => void) => {
        const pin: number = Number.parseInt(p);
        const angle: number = Number.parseInt(ang);

        board.pinMode(pin, Pin.SERVO);
        board.servoWrite(pin, angle);

        if (cb) cb(`Set servo pin ${p} to ${angle} degrees`);
        console.log(socket.id, pin, angle);
    })

    socket.on("set-photoresistor", (pin: string, cb?: (msg?: string) => void) => {
        const room = `resistor-${pin}`;
        
        if (!socket.rooms.has(room)) {
            socket.join(room);

            const sensor = new Sensor({
                pin: pin,
                board: board,
                type: "analog",
                freq: 250
            });

            sensor.on("change", () => {
                socket.to(room).emit("photoresistor", sensor.value);
            });
            
            console.log(`New room: ${room}`);
            console.log(`${socket.id} joined room ${room}`);
            
            if (cb) cb(`Set pin resistor to pin ${pin}`);
        }
        else {
            if (cb) cb(`Resistor pin ${pin} is already used, try to lisen to "photoresistor" room: ${room}`);
        }
    })

    socket.on("join-photoresistor", (pin) => {
        const room = `resistor-${pin}`;

        if (!socket.rooms.has(room)) {
            socket.join(room);
            console.log(socket.rooms);
            console.log(`${socket.id} Joined room ${room}`);
        }
    })
}