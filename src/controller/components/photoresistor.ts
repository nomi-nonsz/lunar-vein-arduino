import { Request, Response } from "express";
import { board } from "../../setup";
import { analogRead } from "../../promises";

export async function readResistor (req: Request, res: Response): Promise<Response<string, any>> {
    const { p } = req.params;
    const pin: string = req.params.p.startsWith("A") ? req.params.p.slice(0, p.length) : req.params.p;

    const resistance = await analogRead(board, pin);

    return res.status(200).json({
        status: 200,
        message: `Analog pin ${p} resistance as ${resistance}°`
    });
}