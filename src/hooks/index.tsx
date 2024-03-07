import { useContext } from "react";
import { BoardControllerContext } from "../contexts/BoardController";
import { ChannelPinState } from "../types/board";

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