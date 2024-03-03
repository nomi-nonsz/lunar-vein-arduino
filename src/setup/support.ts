export interface SupportBoard {
    port: string | null,
    connected: boolean,
    PINS: {
        pwm: number[],
        analog: number[],
    }
    sort: () => void
}

export class SuBoard implements SupportBoard {
    public port = null;
    public connected = false;
    public PINS = {
        pwm: [],
        analog: []
    };
    public sort() {
        this.PINS.pwm = this.PINS.pwm.sort((a, b) => b - a);
        this.PINS.analog = this.PINS.analog.sort((a, b) => b - a);
    }
}