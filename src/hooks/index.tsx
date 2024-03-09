import { useContext } from "react";
import { BoardControllerContext } from "../contexts/BoardController";
import { ChannelPinState } from "../types/board";

export function usePin () {
    return useContext(BoardControllerContext);
}


export function useLed () {
    const { leds, setLeds } = useContext(BoardControllerContext);

    const getLed = (pin: number | string) => {
        return leds.find(val => val.pin == pin);
    }

    const addLed = (pin: number | string, state?: boolean) => {
        const newLed = [...leds, { pin, state: state || false }];
        setLeds!(newLed);
    }

    const removeLed = (index: number) => {
        const newLed = leds.filter((_led, i) => i != index);
        setLeds!(newLed);
    }

    const setLed = (pin: number | string, state: boolean) => {
        const newLed = leds.map(led => {
            if (led.pin == pin) return { pin, state };
            return led;
        })
        setLeds!(newLed);
    }

    const setLedPin = (index: number | string, newPin: number | string) => {
        const newLed = leds.map((led, i) => {
            if (i == index) return { pin: newPin, state: led.state };
            return led;
        })
        setLeds!(newLed);
    }

    return { leds, getLed, setLed, setLedPin, addLed, removeLed };
}



export function useRgbLed () {
    const { rgbLed, setRgbLed } = useContext(BoardControllerContext);

    const getLed = (index: number) => {
        const led = rgbLed.find((_val, i) => i == index);
        return led;
    }

    const addLed = (channelPin: ChannelPinState) => {
        const newLed: ChannelPinState[] = [
            ...rgbLed,
            {
                red: channelPin.red,
                green: channelPin.green,
                blue: channelPin.blue
            }
        ];
        setRgbLed!(newLed);
    }

    const removeLed = (index: number) => {
        const newLed: ChannelPinState[] = rgbLed.filter((_led, i) => i != index);
        setRgbLed!(newLed);
    }

    const setLed = (index: number, channelPin: ChannelPinState) => {
        const newLed: ChannelPinState[] = rgbLed.map((led, i) => {
            if (i == index) return channelPin;
            return led;
        })
        setRgbLed!(newLed);
    }

    return { rgbLed, getLed, setLed, addLed, removeLed };
}



export function usePiezo () {
    const { piezo, setPiezo } = useContext(BoardControllerContext);

    const getPiezo = (pin: number | string) => {
        return piezo.find(val => val.pin == pin);
    }

    const addPiezo = (pin: number | string, state: number) => {
        const newPiezo = [...piezo, { pin, state }];
        setPiezo!(newPiezo);
    }

    const removePiezo = (index: number) => {
        const newPiezo = piezo.filter((_piezo, i) => i != index);
        setPiezo!(newPiezo);
    }

    const setFrequency = (pin: number | string, state: number) => {
        const newPiezo = piezo.map(piezo => {
            if (piezo.pin == pin) return { pin, state };
            return piezo;
        })
        setPiezo!(newPiezo);
    }

    const setPiezoPin = (index: number | string, newPin: number | string) => {
        const newPiezo = piezo.map((piezo, i) => {
            if (i == index) return { pin: newPin, state: piezo.state };
            return piezo;
        })
        setPiezo!(newPiezo);
    }

    return { piezo, getPiezo, addPiezo, removePiezo, setFrequency, setPiezoPin };
}



export function useServo () {
    const { motoServo, setMotoServo } = useContext(BoardControllerContext);

    const getServo = (pin: number | string) => {
        return motoServo.find(val => val.pin == pin);
    }

    const addServo = (pin: number | string, state: number) => {
        const newPesistor = [...motoServo, { pin, state }];
        setMotoServo!(newPesistor);
    }

    const removeServo = (index: number) => {
        const newPesistor = motoServo.filter((_servo, i) => i != index);
        setMotoServo!(newPesistor);
    }

    const setDegree = (pin: number | string, state: number) => {
        const newPiezo = motoServo.map(servo => {
            if (servo.pin == pin) return { pin, state };
            return servo;
        })
        setMotoServo!(newPiezo);
    }

    const setServoPin = (index: number, newPin: number | string) => {
        const newPesistor = motoServo.map((servo, i) => {
            if (i == index) return { pin: newPin, state: servo.state };
            return servo;
        })
        setMotoServo!(newPesistor);
    }

    return { motoServo, getServo, addServo, removeServo, setDegree, setServoPin };
}


export function usePhotoresistor () {
    const { photoresistor, setPhotoresistor } = useContext(BoardControllerContext);

    const getResistor = (pin: number | string) => {
        return photoresistor.find(val => val.pin == pin);
    }

    const addResistor = (pin: number | string, state: number) => {
        const newPesistor = [...photoresistor, { pin, state }];
        setPhotoresistor!(newPesistor);
    }

    const removeResistor = (index: number) => {
        const newPesistor = photoresistor.filter((_resist, i) => i != index);
        setPhotoresistor!(newPesistor);
    }

    const setResistorPin = (index: number, newPin: number | string) => {
        const newPesistor = photoresistor.map((resist, i) => {
            if (i == index) return { pin: newPin, state: resist.state };
            return resist;
        })
        setPhotoresistor!(newPesistor);
    }

    return { photoresistor, getResistor, addResistor, removeResistor, setResistorPin };
}
