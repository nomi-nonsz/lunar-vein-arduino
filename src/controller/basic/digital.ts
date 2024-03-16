import { Request, Response } from "express";
import { board } from "../../setup";

interface DigitalState {
    pin: number | string,
    state: string
}

export function digitalWrite (req: Request, res: Response): Response<string | any> {
    const { pin, state }: DigitalState = req.body;
    let value: number;

    try {
        switch (state) {
            case 'LOW' || 0: value = 0; break;
            case 'HIGH' || 1: value = 1; break;
            default:
                return res.status(400).json({
                    status: 400,
                    message: `Invalid state ${state}, read the documentation`
                })
        }
    
        const val = value == 1 ? "HIGH" : "LOW";
        board.digitalWrite(pin, value);
    
        return res.status(200).json({
            status: 200,
            pin_state: {
                [pin]: val
            }
        });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export function digitalRead (req: Request, res: Response): Response<string | any> {
    try {
        const { pin } = req.params;
        const value = board.pins[pin].value == 1 ? 'HIGH' : 'LOW';
        return res.status(200).json({
            pin_state: {
                [pin]: value
            }
        });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}