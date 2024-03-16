import { Request, Response } from "express";
import { board } from "../../setup";

export function rotateServo (req: Request, res: Response): Response<string, any> {
    const { p } = req.params;
    const pin: string = req.params.p.startsWith("A") ? req.params.p.slice(0, p.length) : req.params.p;
    const angle: number = Number.parseInt(req.params.ang);

    if (Number.isNaN(angle)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid angle param, it should be integer'
        });
    }

    board.servoWrite(pin, angle);

    return res.status(200).json({
        status: 200,
        message: `Pin ${p} rotate as ${angle}°`
    });
}