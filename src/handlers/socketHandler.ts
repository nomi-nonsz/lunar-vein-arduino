import { Socket } from "socket.io";
import { board } from "../setup";

export default (socket: Socket) => {
    console.log(`${socket.id} | ${socket.client.request.headers.host} | Joined`);

    socket.on("control-servo", (pin: number, angle: number) => {
        board.servoWrite(pin, angle);
        console.log();
    })

    socket.on("read-photoresistor", (pin: string) => {
        board.analogRead(pin, (value) => {
            socket.emit("read-photoresistor", value);
        });
    })
}