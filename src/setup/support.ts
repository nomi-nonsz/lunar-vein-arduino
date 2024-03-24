import { Board } from "johnny-five";

export interface SupportBoard {
    port: string | null,
    connected: boolean,
    PINS: {
        digital: number[],
        analog: number[],
    }
    sort: () => void
}

export class SuBoard implements SupportBoard {
    public board: Board | null;
    public port = null;
    public connected = false;
    public PINS = {
        digital: [],
        analog: []
    };
    public sort() {
        this.PINS.digital = this.PINS.digital.sort((a, b) => b - a);
        this.PINS.analog = this.PINS.analog.sort((a, b) => b - a);
    }
}