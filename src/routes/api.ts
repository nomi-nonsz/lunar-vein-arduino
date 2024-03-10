import { Response } from "express";
import { Router } from "express";

import { readLed, readRgbLed, writeLed, writeRgbLed } from "../controller/led";
import { readPin, setPin } from "../controller/pin";
import { piezoNoTone, piezoNote, piezoPlayNotes, piezoTone } from "../controller/piezo";
import { rotateServo } from "../controller/servo";
import { readResistor } from "../controller/photoresistor";

import { isPinNumeric } from "../middleware/pin";

const router: Router = Router();

// Client page
router.get('/hello', (req, res: Response): Response<string> => {
    return res.status(200).send("Hello");
})

// PinMode
router.get('/pin/:p', readPin);
router.patch('/pin/:p/:m', setPin);

// LED
router.get('/led/:p', isPinNumeric, readLed);
router.patch('/led/:p/:a', isPinNumeric, writeLed);

// RGB LED
router.post('/rgb-led', readRgbLed);
router.patch('/rgb-led/', writeRgbLed);

// Piezo
router.patch('/piezo/:p/:f', isPinNumeric, piezoTone);
router.patch('/piezo/note', piezoNote);
router.patch('/piezo/music/', piezoPlayNotes);
router.patch('/piezo/stop/', piezoNoTone);

// for real-time communication is deprecated and not recommended
// use other protocol like websocket instead
router.patch('/servo/:p/:m', rotateServo);
router.get('/photoresistor/:p', readResistor);

export default router;