import { Request, Response } from "express";
import { board } from "../setup";

export interface ColorChannel {
    r: string,
    g: string,
    b: string
}

export async function readLed (req: Request, res: Response) {
    const { p } = req.params;
    const pin = Number.parseInt(p);

    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    const pinState = board.pins[pin].value == 1 ? 'ON' : 'OFF';

    return res.status(200).json({
        status: 200,
        message: `Pin ${pin} state ${pinState}`
    });
}

export async function writeLed (req: Request, res: Response) {
    const { p, a } = req.params;
    const act = a.toLocaleLowerCase();
    const pin = Number.parseInt(p);

    try {
        if (Number.isNaN(pin)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid pin param, it should be integer'
            });
        }
    
        switch (act) {
            case 'on':
                board.digitalWrite(pin, board.HIGH);
                console.log(`${req.hostname} | ${pin} | LED: ${act.toLocaleUpperCase()}`);
                break;
            case 'off':
                board.digitalWrite(pin, board.LOW);
                console.log(`${req.hostname} | ${pin} | LED: ${act.toLocaleUpperCase()}`);
                break;
            default:
                console.log(`${req.hostname} | ${pin} | LED: INVALID ACT`);
        }

        res.status(200).json({
            status: 200,
            message: `Success changed pin ${pin} to state ${act}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};