import { Request, Response } from "express";
import { board, suBoard } from "../../setup";
import { sPinModes } from "..";
import { Pin } from "johnny-five";

export function readPin (req: Request, res: Response): Response<string | any> {
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

export function readPins (req: Request, res: Response): Response<string | any> {
    const pins: string[] = req.body.p;
    const pinModes = [];

    pins.forEach((pin) => {
        const { mode } = board.pins[pin];
        pinModes.push({
            pin: pin,
            mode: mode
        });
    })

    return res.status(200).json({
        status: 200,
        pins: [ ...pinModes ]
    });
}

export function setPin (req: Request, res: Response): Response<string | any> {
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

export function setPins (req: Request, res: Response): Response<string | any> {
    type PinModes = {
        pin: string,
        mode: sPinModes | string
    }

    const { pinModes }: { pinModes: PinModes[] } = req.body;

    pinModes.forEach((p) => {
        const { pin, mode } = p;
        board.pinMode(pin, Pin[mode]);

        suBoard.PINS.pwm.push(pin);
        suBoard.sort();
    });

    return res.status(200).json({
        status: 200,
        pins: [ ...pinModes ]
    });
}