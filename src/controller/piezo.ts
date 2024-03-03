import { Request, Response } from "express";
import { Piezo } from "johnny-five";
import { Pitch } from "../melodies";

export function piezoTone (req: Request, res: Response) {
    const pin: number = Number.parseInt(req.params.p);
    const note: string = req.params.n;

    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    const piezo = new Piezo(pin);

    piezo.play({
        song: note.toUpperCase(),
        beats: 1/2,
        tempo: 100
    })

    return res.status(200).json({
        status: 200,
        message: `Piezo ${pin} tone ${note}`
    });
}