export type PinMode = {
    pin: string | number,
    mode: 'INPUT' | 'OUTPUT' | 'SERVO'
}

export type PinState = {
    pin: number | string,
    state: boolean
}

export type DynamicPinState = {
    pin: string | number,
    state: number
}

export interface ChannelPinState {
    red: PinState,
    green: PinState,
    blue: PinState
}