import { Response } from "express";
import { Router } from "express";
import { readLed, writeLed } from "../controller/led";
import { isBoardConnected } from "../middleware/connection";

const router = Router();

router.get('/hello', (req, res: Response) => {
    res.status(200).send("Hello");
})

router.get('/led/:p', isBoardConnected, readLed);
router.patch('/led/:p/:a', isBoardConnected, writeLed);

export default router;