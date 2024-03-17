import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { ChannelPinState, DynamicPinState, PiezoMusic, PinMode, PinState } from "../types/board";

import ExampleMusic1 from "../data/music/ode-to-joy.json";
import ExampleMusic2 from "../data/music/fallen-down.json";

interface ControllerContextProps {
    pinModes: PinMode[];
    leds: PinState[];
    rgbLed: ChannelPinState[];
    piezo: DynamicPinState[];
    piezeNotes: PiezoMusic[];
    motoServo: DynamicPinState[];
    photoresistor: DynamicPinState[];

    setPinModes?: Dispatch<SetStateAction<PinMode[]>>;
    setLeds?: Dispatch<SetStateAction<PinState[]>>;
    setRgbLed?: Dispatch<SetStateAction<ChannelPinState[]>>;
    setPiezo?: Dispatch<SetStateAction<DynamicPinState[]>>;
    setNotes?: Dispatch<SetStateAction<PiezoMusic[]>>;
    setMotoServo?: Dispatch<SetStateAction<DynamicPinState[]>>;
    setPhotoresistor?: Dispatch<SetStateAction<DynamicPinState[]>>;
}

const INIT_VALUES: ControllerContextProps = {
    pinModes: [],
    leds: [
        {
            pin: 13,
            state: false
        }
    ],
    rgbLed: [
        {
            red: {
                pin: 13,
                state: false
            },
            green: {
                pin: 12,
                state: false
            },
            blue: {
                pin: 11,
                state: false
            }
        }
    ],
    piezo: [
        {
            pin: 6,
            state: 262
        }
    ],
    piezeNotes: [
        ExampleMusic1,
        ExampleMusic2
    ],
    motoServo: [
        {
            pin: "9",
            state: 0
        }
    ],
    photoresistor: [
        {
            pin: "A0",
            state: 0
        }
    ],
}

export const BoardControllerContext = createContext<ControllerContextProps>(INIT_VALUES);

export function BoardControllerProvider ({ children }: { children: ReactNode }) {
    const [pinModes, setPinModes] = useState<PinMode[]>(INIT_VALUES.pinModes);
    const [leds, setLeds] = useState<PinState[]>(INIT_VALUES.leds);
    const [rgbLed, setRgbLed] = useState<ChannelPinState[]>(INIT_VALUES.rgbLed);
    const [piezo, setPiezo] = useState<DynamicPinState[]>(INIT_VALUES.piezo);
    const [piezeNotes, setNotes] = useState<PiezoMusic[]>(INIT_VALUES.piezeNotes);
    const [motoServo, setMotoServo] = useState<DynamicPinState[]>(INIT_VALUES.motoServo);
    const [photoresistor, setPhotoresistor] = useState<DynamicPinState[]>(INIT_VALUES.photoresistor);

    const contextValue: ControllerContextProps = {
        pinModes, setPinModes,
        leds, setLeds,
        rgbLed, setRgbLed,
        piezo, setPiezo,
        piezeNotes, setNotes,
        motoServo, setMotoServo,
        photoresistor, setPhotoresistor
    };

    return <BoardControllerContext.Provider value={contextValue}>
        {children}
    </BoardControllerContext.Provider>
}