import { useState } from "react";
import PinBox from "../forms/PinBox";
import { PinState } from "../../types/board";
import { useLed } from "../../hooks";


function ControlLED () {
    const { addLed, getLed, leds, removeLed, setLed, setLedPin } = useLed();

    const handleAdd = (): void => {
        let anopin = 13;
        for (let i = 0; i < leds.length; i++) {
            // console.log(leds[i].pin != anopin, leds[i].pin, anopin);
            if (leds[i].pin != anopin) break;
            anopin--;
        }
        addLed(anopin, false);
    }

    return (
        <div className="container py-16">
            <div className="container-grid items-center relative">
                <div className="col-span-6">
                    <h2 className="text-4xl font-poppins font-bold leading-normal mb-4">
                        LED
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                        {leds.map((led, i) => (
                            <PinBox
                                key={i}
                                value={led.pin}
                                state={led.state}
                                onValueChange={(e) => {
                                    const pin = e.target.value;
                                    if (leds.filter(led => led.pin == pin).length > 0) {
                                        alert(`Pin ${pin} is already use`);
                                        return;
                                    }
                                    setLedPin(led.pin, pin);
                                }}
                                onStateChange={() => {
                                    const state = !led.state;
                                    setLed(led.pin, state);
                                }}
                            />
                        ))}
                        {leds.length < 14 && <PinBox.Add
                            onClick={handleAdd}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlLED;