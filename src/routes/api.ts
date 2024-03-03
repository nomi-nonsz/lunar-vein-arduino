import { Response } from "express";
import { Router } from "express";
import { readLed, readRgbLed, writeLed, writeRgbLed } from "../controller/led";
import { readPin, setPin } from "../controller/pin";

const router = Router();

router.get('/hello', (req, res: Response) => {
    res.status(200).send("Hello");
})

router.get('/pin/:p', readPin);
router.patch('/pin/:p/:m', setPin);

router.get('/led/:p', readLed);
router.patch('/led/:p/:a', writeLed);

router.get('/rgb-led', readRgbLed);
router.patch('/rgb-led/', writeRgbLed);

export default router;