import { Request, Response } from "express";
import { Piezo } from "johnny-five";
import { Pitch } from "../melodies";

export function piezoTone (req: Request, res: Response): Response {
    const { pin, note }: { pin: number, note: string } = req.body;

    const piezo: Piezo = new Piezo(pin);

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
    const { pin }: { pin: number } = req.body;

    new Piezo(pin).noTone();

    return res.sendStatus(200);
}

interface MusicSheet {
    notes: string[];
    beats: number;
    tempo: 100
}

export function piezoPlayNotes (req: Request, res: Response): Response {
    const { pin }: { pin: number } = req.body;
    const { notes, beats, tempo }: MusicSheet = req.body;

    const piezo: Piezo = new Piezo(pin);
    const song: [frequency: string, duration: number][] = notes
        .map((note, i): [frequency: string, duration: number] => {
            const beat = notes[i+1] && notes[i+1].trim() == "-" ? beats*2 : beats;
            return [note, beat]
        })
        .filter((note) => note[0].trim() != "-");
    
    const notesS: string = notes.join(", ");

    piezo.play({ song, tempo });

    return res.status(200).json({
        status: 200,
        message: `Piezo ${pin} play notes ${notesS}`
    });
}