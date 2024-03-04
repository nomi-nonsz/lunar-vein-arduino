import { Response } from "express";
import { Router } from "express";

import { readLed, readRgbLed, writeLed, writeRgbLed } from "../controller/led";
import { readPin, setPin } from "../controller/pin";
import { piezoNoTone, piezoPlayNotes, piezoTone } from "../controller/piezo";
import { isPinNumeric } from "../middleware/pin";

const router: Router = Router();

router.get('/hello', (req, res: Response): Response<string> => {
    return res.status(200).send("Hello");
})

router.get('/pin/:p', readPin);
router.patch('/pin/:p/:m', setPin);

router.get('/led/:p', isPinNumeric, readLed);
router.patch('/led/:p/:a', isPinNumeric, writeLed);

router.get('/rgb-led', readRgbLed);
router.patch('/rgb-led/', writeRgbLed);

router.patch('/piezo/', piezoTone);
router.patch('/piezo/stop/', piezoNoTone);
router.patch('/piezo/music/', piezoPlayNotes);

export default router;