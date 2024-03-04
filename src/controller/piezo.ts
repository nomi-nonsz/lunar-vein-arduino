import { Request, Response } from "express";
import { Piezo } from "johnny-five";
import { Pitch } from "../melodies";

export function piezoTone (req: Request, res: Response): Response {
    const pin: number = Number.parseInt(req.params.p);
    const note: string = req.params.n;

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

export function piezoNoTone (req: Request, res: Response): Response {
    const pin: number = Number.parseInt(req.params.p);
    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    new Piezo(pin).noTone();

    return res.sendStatus(200);
}

interface MusicSheet {
    notes: string[];
    beats: number;
    tempo: 100
}

export function piezoPlayNotes (req: Request, res: Response): Response {
    const pin: number = Number.parseInt(req.params.p);
    const { notes, beats, tempo }: MusicSheet = req.body;

    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    const piezo: Piezo = new Piezo(pin);
    const song: [frequency: string, duration: number][] = notes.map((note): [frequency: string, duration: number] => { return [note, beats]});
    const notesS: string = notes.join(", ");

    piezo.play({ song, tempo });

    return res.status(200).json({
        status: 200,
        message: `Piezo ${pin} play notes ${notesS}`
    });
}