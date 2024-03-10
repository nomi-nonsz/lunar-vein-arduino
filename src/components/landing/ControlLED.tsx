import { ChangeEvent, Ref, useEffect } from "react";
import PinBox from "../forms/PinBox";
import { useLed } from "../../hooks";
import ControlSection from "../ControlSection";
import { PinState } from "../../types/board";
import { PatchLed } from "../../controllers/BoardController";

function LedItem ({ led, index }: { led: PinState, index: number }) {
    const { removeLed, setLed, setLedPin } = useLed();

    const handleChange = (e: ChangeEvent<HTMLInputElement | null>) => {
        const pin = e.target?.value;
        setLedPin(index, pin);
    }

    const toggleLed = () => {
        setLed(led.pin, !led.state);
    }

    const handleRemove = () => {
        removeLed(index);
    }

    useEffect(() => {
        const pin: number = typeof led.pin == "string" ? Number.parseInt(led.pin) : led.pin;
        PatchLed(pin, led.state);
    }, [led.state]);

    return (
        <PinBox.Toggle
            className="w-36 animate-fade-in"
            minusBtn={true}
            value={led.pin}
            state={led.state}
            onValueChange={handleChange}
            onStateChange={toggleLed}
            onDelete={handleRemove}
        />
    )
}

function ControlLED ({ refto }: { refto?: Ref<HTMLDivElement> }) {
    const { addLed, leds } = useLed();

    const handleAdd = (): void => {
        let anopin = 13;
        for (let i = 0; i < leds.length; i++) {
            if (leds.filter(led => led.pin == anopin).length > 0) {
                anopin--;
            }
            else break;
        }
        addLed(anopin, false);
    }

    return (
        <ControlSection
            title="LED"
            id="led"
            description={<>
            Light Emitting Diode {"("}LED{")"} is one of the simplest Arduino electronics components, it is a type of semiconductor diode that produces light when an electric current flows through it.
            </>}
            refto={refto}
            stack={(<>
                {leds.map((led, i) => (
                    <LedItem
                        led={led}
                        index={i}
                        key={i}
                    />
                ))}
                {leds.length < 14 && <PinBox.Add
                    className="w-36 mt-10"
                    onClick={handleAdd}
                />}
            </>)}
        />
    )
}

export default ControlLED;