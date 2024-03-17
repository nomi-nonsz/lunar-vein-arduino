import { Request, Response } from "express";
import { board } from "../../setup";
import * as Promises from "../../promises";

interface AnalogState {
    pin: string,
    value: number
}

export function analogWrite (req: Request, res: Response): Response<string | any> {
    const { pin, value }: AnalogState = req.body;

    try {
        board.analogWrite(pin[0] == "A" ? pin.slice(1, pin.length) : pin, value);
    
        return res.status(200).json({
            status: 200,
            analog_state: {
                [pin]: value
            }
        });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function analogRead (req: Request, res: Response) {
    let { pin } = req.params;
    pin = pin[0] == "A" ? pin.slice(1, pin.length) : pin;

    try {
        const value = await Promises.analogRead(board, pin);
    
        return res.status(200).json({
            status: 200,
            analog_state: {
                [pin]: value
            }
        })
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}