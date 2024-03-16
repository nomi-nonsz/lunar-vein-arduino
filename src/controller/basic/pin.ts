import { Request, Response } from "express";
import { board, suBoard } from "../../setup";
import { sPinModes } from "..";
import { Pin } from "johnny-five";

export function readPin (req: Request, res: Response) {
    const pin: string = req.params.p;

    const { mode } = board.pins[pin];

    return res.status(200).json({
        status: 200,
        pins: [
            {
                pin: pin,
                mode: mode
            }
        ],
        message: `Pin ${pin} is ${mode}`
    });
}

export function setPin (req: Request, res: Response) {
    const pin: string = req.params.p;
    const mode: sPinModes | string = req.params.m.toUpperCase();

    board.pinMode(pin, Pin[mode]);

    suBoard.PINS.pwm.push(pin);
    suBoard.sort();

    return res.status(200).json({
        status: 200,
        pins: [
            {
                pin: pin,
                mode: mode
            }
        ],
        message: `Pin ${pin} setted as ${mode}`
    });
}