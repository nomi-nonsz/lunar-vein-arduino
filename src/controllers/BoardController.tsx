import axios from "axios";
import { ChannelPinState, PiezoMusic } from "../types/board";
import { io } from "../socket/socket.io";

const url = "http://localhost:3000/api-arduino";

export async function PatchLed (pin: number, state: boolean) {
    const act = state == true ? 'on' : 'off';
    
    const res = await axios.patch(`${url}/led/${pin}/${act}`);
    const data = res.data;

    console.log("LED Response: ", data);
}

export async function PatchRgbLed (state: ChannelPinState) {
    const { red, green, blue } = state;
    const body = {
        r: {
            pin: red.pin,
            value: red.state
        },
        g: {
            pin: green.pin,
            value: green.state
        },
        b: {
            pin: blue.pin,
            value: blue.state
        }
    }
    const res = await axios.patch(`${url}/rgb-led`, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = res.data;

    console.log("RGB LED Response: ", data);
}

export async function PatchPiezo (pin: number, freq: number) {
    const res = await axios.patch(`${url}/piezo/${pin}/${freq}`);
    const data = res.data;

    console.log("Piezo Response: ", data);
}

export async function PatchPiezoMusic (music: PiezoMusic) {
    const res = await axios.patch(`${url}/piezo/music`, music, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = res.data;

    console.log("Piezo Response: ", data);
}


export async function PatchServo(pin: string | number, value: number) {
    io.emit("servo", pin, value);
}