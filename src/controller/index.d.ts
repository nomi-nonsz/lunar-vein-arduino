
export type digitalValue = 'ON' | 'OFF';
export type voltage = 'HIGH' | 'LOW' | 'high' | 'low' | 1 | 0;
export type sPinModes = 'INPUT' | 'OUTPUT' | 'ANALOG' | 'PWM' | 'SERVO';

export interface ChannelPins {
    pin: number,
    value: boolean
}

export interface ColorChannel {
    r: string,
    g: string,
    b: string
}