import Firmata from 'firmata';

export const comport: string = '/dev/ttyUSB0';
export const board: Firmata = new Firmata(comport);

export const suBoard = {
    connected: false,
    PIN: {
        servo: 0,
        rgb_led: {
            r: 10,
            g: 9,
            b: 8
        }
    }
}