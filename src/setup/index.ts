import Firmata from 'firmata';

export const comport = '/dev/ttyUSB0';
export const board = new Firmata(comport);

export const PIN = {
    servo: 0,
    rgb_led: {
        r: 10,
        g: 9,
        b: 8
    }
}