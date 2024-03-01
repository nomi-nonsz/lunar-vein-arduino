import { Response } from "express";
import { Router } from "express";
import { readLed, writeLed } from "../controller/led";

const router = Router();

router.get('/hello', (req, res: Response) => {
    res.send("Hello");
})

router.get('/led/:p', readLed);
router.patch('/led/:p/:a', writeLed);

export default router;