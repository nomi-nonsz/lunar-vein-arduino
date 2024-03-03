import { Response } from "express";
import { Router } from "express";

import { readLed, readRgbLed, writeLed, writeRgbLed } from "../controller/led";
import { readPin, setPin } from "../controller/pin";
import { piezoTone } from "../controller/piezo";

const router: Router = Router();

router.get('/hello', (req, res: Response): Response<string> => {
    return res.status(200).send("Hello");
})

router.get('/pin/:p', readPin);
router.patch('/pin/:p/:m', setPin);

router.get('/led/:p', readLed);
router.patch('/led/:p/:a', writeLed);

router.get('/rgb-led', readRgbLed);
router.patch('/rgb-led/', writeRgbLed);

router.patch('/piezo/:p/:n', piezoTone);

export default router;