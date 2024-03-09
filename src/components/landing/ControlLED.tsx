import PinBox from "../forms/PinBox";
import { useLed } from "../../hooks";
import ControlSection from "../ControlSection";
import { Ref } from "react";


function ControlLED ({ refto }: { refto?: Ref<HTMLDivElement> }) {
    const { addLed, leds, removeLed, setLed, setLedPin } = useLed();

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
                <PinBox.Toggle
                    className="w-36 animate-fade-in"
                    key={i}
                    minusBtn={true}
                    value={led.pin}
                    state={led.state}
                    onValueChange={(e) => {
                        const pin = e.target.value;
                        setLedPin(i, pin);
                    }}
                    onStateChange={() => {
                        const state = !led.state;
                        setLed(led.pin, state);
                    }}
                    onDelete={() => {
                        removeLed(i);
                    }}
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