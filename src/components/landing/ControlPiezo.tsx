import PinBox from "../forms/PinBox";
import ControlSection from "../ControlSection";
import { PatchPiezo } from "../../controllers/BoardController";
import { ChangeEvent, Ref, useEffect, useState } from "react";
import { usePiezo } from "../../hooks";
import { DynamicPinState } from "../../types/board";
import EvoInput from "../forms/EvoInput";
import Button from "../forms/Button";

function PiezoItem ({ piezo, index }: { piezo: DynamicPinState, index: number }) {
    const { setFrequency, setPiezoPin, removePiezo } = usePiezo();

    const [freq, setFreq] = useState<number | string>(piezo.state);

    const handlePinChange = (e: ChangeEvent<HTMLInputElement | null>) => {
        const pin = e.target?.value;
        setPiezoPin(index, pin);
    }

    const handleFreqChange = (e: ChangeEvent<HTMLInputElement | null>) => {
        setFreq(e.target.value);
    }

    const handleDelete = () => {
        removePiezo(index);
    }

    const handlePatch = () => {
        const pin: number = typeof piezo.pin == "string" ? Number.parseInt(piezo.pin) : piezo.pin;
        PatchPiezo(pin, piezo.state);
    }
    
    useEffect(() => {
        const f: number = typeof freq == "string" ? Number.parseInt(freq) : freq;
        if (!Number.isNaN(freq)) setFrequency(index, f);
    }, [freq])

    return (
        <div className="flex flex-col gap-3">
            <PinBox
                className="w-36 animate-fade-in"
                minusBtn={true}
                value={piezo.pin}
                onValueChange={handlePinChange}
                onDelete={handleDelete}
            />
            <EvoInput
                className="w-36 h-11"
                name="Frequency"
                type="number"
                value={piezo.state.toString()}
                onChange={handleFreqChange}
            />
            <Button.Primary onClick={handlePatch} className="text-sm !py-0 h-11">Play</Button.Primary>
        </div>
    )
}

function ControlPiezo ({ refto }: { refto?: Ref<HTMLDivElement> }) {
    const { piezo: piezos, addPiezo } = usePiezo();

    const handleAdd = (): void => {
        let anopin = 13;
        for (let i = 0; i < piezos.length; i++) {
            if (piezos.filter(piezo => piezo.pin == anopin).length > 0) {
                anopin--;
            }
            else break;
        }
        addPiezo(anopin, 247);
    }

    return (
        <ControlSection
            title="Piezo Buzzer"
            id="piezo"
            description={<>
            Piezo buzzer is a type of transducer that converts electrical signals into sound. It uses piezoelectric elements to generate mechanical vibrations that then produce sound. Piezo buzzer can produce sound with a given frequency depending on its characteristics
            </>}
            refto={refto}
            stack={(<>
                {piezos.map((piezo, i) => (
                    <PiezoItem
                        index={i}
                        piezo={piezo}
                        key={i}
                    />
                ))}
                {piezos.length < 14 && <PinBox.Add
                    className="w-36 mt-10"
                    onClick={handleAdd}
                />}
            </>)}
        />
    )
}

export default ControlPiezo;