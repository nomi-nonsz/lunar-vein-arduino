import { Socket } from "socket.io";
import { board } from "../setup";

export default (socket: Socket) => {
    console.log(`${socket.id} | ${socket.client.request.headers.host} | Joined`);

    socket.on("control-servo", (p: string, ang: string) => {
        const pin = Number.parseInt(p);
        const angle = Number.parseInt(ang);

        board.servoWrite(pin, angle);
        console.log(socket.id, pin, angle);
    })

    socket.on("read-photoresistor", (pin: string) => {
        board.analogRead(pin, (value) => {
            socket.emit("read-photoresistor", value);
            console.log(socket.id, "A"+pin, value);
        });
    })
}