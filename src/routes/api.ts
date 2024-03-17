import { Response } from "express";
import { Router } from "express";

import { readPin, readPins, setPin, setPins } from "../controller/basic/pin";
import { digitalRead, digitalWrite } from "../controller/basic/digital";
import { analogRead, analogWrite } from "../controller/basic/analog";

import { readLed, readRgbLed, writeLed, writeRgbLed } from "../controller/components/led";
import { piezoNoTone, piezoNote, piezoPlayNotes, piezoTone } from "../controller/components/piezo";
import { rotateServo } from "../controller/components/servo";
import { readResistor } from "../controller/components/photoresistor";

import { isPinNumeric } from "../middleware/pin";

const router: Router = Router();

router.get('/hello', (req, res: Response): Response<string> => {
    return res.status(200).send("Hello");
})

// PinMode
router.get('/pin/:p', readPin);
router.get('/pins', readPins);
router.patch('/pin/:p/:m', setPin);
router.patch('/pins', setPins);

// Digital read/write
router.get('/digital/:pin', digitalRead);
router.patch('/digital', digitalWrite);

// Analog read/write
router.get('/analog/:pin', analogRead);
router.patch('/analog', analogWrite);


// LED
router.get('/led/:p', isPinNumeric, readLed);
router.patch('/led/:p/:a', isPinNumeric, writeLed);

// RGB LED
router.post('/rgb-led', readRgbLed);
router.patch('/rgb-led/', writeRgbLed);

// Piezo
router.patch('/piezo/:p/:f', isPinNumeric, piezoTone);
router.patch('/piezo/note', piezoNote);
router.patch('/piezo/music', piezoPlayNotes);
router.patch('/piezo/stop', piezoNoTone);

// for real-time communication is deprecated and not recommended
// use other protocol like websocket instead, we're using socket.io
router.patch('/servo/:p/:m', rotateServo);
router.get('/photoresistor/:p', readResistor);

export default router;