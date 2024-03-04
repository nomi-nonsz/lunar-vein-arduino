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

router.get('/pin/:p', isPinNumeric, readPin);
router.patch('/pin/:p/:m', isPinNumeric, setPin);

router.get('/led/:p', isPinNumeric, readLed);
router.patch('/led/:p/:a', isPinNumeric, writeLed);

router.get('/rgb-led', readRgbLed);
router.patch('/rgb-led/', writeRgbLed);

router.patch('/piezo/:p/:n', isPinNumeric, piezoTone);
router.patch('/piezo/stop/:p/', isPinNumeric, piezoNoTone);
router.patch('/piezo/music/:p', isPinNumeric, piezoPlayNotes);

export default router;