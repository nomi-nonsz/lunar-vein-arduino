import { Request, Response } from "express";
import { board, suBoard } from "../setup";
import { sPinModes } from ".";
import { Pin } from "johnny-five";

export function readPin (req: Request, res: Response) {
    const pin: number = Number.parseInt(req.params.p);

    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    const { mode } = board.pins[pin];

    return res.status(200).json({
        status: 200,
        state: {
            used: true
        },
        message: `Pin ${pin} is ${mode}`
    });
}

export function setPin (req: Request, res: Response) {
    const pin: number = Number.parseInt(req.params.p);
    const mode: sPinModes | string = req.params.m.toUpperCase();
    
    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    board.pinMode(pin, Pin[mode]);

    suBoard.PINS.pwm.push(pin);
    suBoard.sort();

    return res.status(200).json({
        status: 200,
        message: `Pin ${pin} setted as ${mode}`
    });
}