import { Socket } from "socket.io";
import { Pin } from "johnny-five";
import { board } from "../setup";

export default (socket: Socket) => {
    console.log(`${socket.id} | ${socket.client.request.headers.host} | Joined`);

    socket.on("servo", (p: string, ang: string) => {
        const pin = Number.parseInt(p);
        const angle = Number.parseInt(ang);

        board.pinMode(pin, Pin.SERVO);
        board.servoWrite(pin, angle);
        console.log(socket.id, pin, angle);
    })

    socket.on("set-photoresistor", (pin: string) => {
        board.analogRead(pin, (value) => {
            socket.emit("photoresistor", value);
            console.log(socket.id, "A"+pin, value);
        });
    })
}