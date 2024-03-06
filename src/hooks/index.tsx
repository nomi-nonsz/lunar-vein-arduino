import { useContext } from "react";
import { BoardControllerContext } from "../contexts/BoardController";

export function usePin () {
    return useContext(BoardControllerContext);
}

export function useLed () {
    const { leds, setLeds } = useContext(BoardControllerContext);

    const getLed = (pin: number | string) => {
        const led = leds.find(val => val.pin == pin);
        return led;
    }

    const addLed = (pin: number | string, state?: boolean) => {
        const newLed = [...leds, { pin, state: state || false }];
        setLeds!(newLed);
    }

    const removeLed = (pin: number | string) => {
        const newLed = leds.filter(led => led.pin != pin);
        setLeds!(newLed);
    }

    const setLed = (pin: number | string, state: boolean) => {
        const newLed = leds.map(led => {
            if (led.pin == pin) return { pin, state };
            return led;
        })
        setLeds!(newLed);
    }

    const setLedPin = (pin: number | string, newPin: number | string) => {
        const newLed = leds.map(led => {
            if (led.pin == pin) return { pin: newPin, state: led.state };
            return led;
        })
        setLeds!(newLed);
    }

    return { leds, getLed, setLed, setLedPin, addLed, removeLed };
}