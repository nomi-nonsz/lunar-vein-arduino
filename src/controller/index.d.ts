
export type digitalValue = 'ON' | 'OFF';
export type voltage = 'HIGH' | 'LOW';
export type sPinModes = 'INPUT' | 'OUTPUT' | 'ANALOG' | 'PWM' | 'SERVO' |'SHIFT' |'I2C' |'ONEWIRE' |'STEPPER' |'SERIAL' |'PULLUP' |'IGNORE' |'PING_READ' | 'UNKOWN';

export interface ChannelPins {
    pin: number,
    value: digitalValue
}

export interface ColorChannel {
    r: string,
    g: string,
    b: string
}