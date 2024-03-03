import { NextFunction, Request, Response } from "express";
import { board, suBoard } from "../setup";

export function isBoardConnected (req: Request, res: Response, next: NextFunction) {
    if (suBoard.connected) {
        next();
    }
    else {
        return res.status(500).json({
            status: 500,
            message: "Internal server error: No Boards connected"
        })
    }
}