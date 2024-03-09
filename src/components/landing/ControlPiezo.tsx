import PinBox from "../forms/PinBox";
import ControlSection from "../ControlSection";
import { Ref } from "react";
import { usePiezo } from "../../hooks";
import { DynamicPinState } from "../../types/board";
import EvoInput from "../forms/EvoInput";
import Button from "../forms/Button";

function PiezoItem ({ piezo, index }: { piezo: DynamicPinState, index: number }) {
    const { setFrequency, setPiezoPin, removePiezo } = usePiezo();

    return (
        <div className="flex flex-col gap-3">
            <PinBox
                className="w-36 animate-fade-in"
                minusBtn={true}
                value={piezo.pin}
                onValueChange={(e) => {
                    const pin = e.target.value;
                    setPiezoPin(index, pin);
                }}
                onDelete={() => {
                    removePiezo(index);
                }}
            />
            <EvoInput
                className="w-36 h-11"
                name="Frequency"
                type="number"
                value={piezo.state.toString()}
                onChange={(e) => {
                    const freq: number = Number.parseInt(e.target.value);
                    if (!Number.isNaN(freq)) setFrequency(piezo.pin, freq);
                }}
            />
            <Button.Primary className="text-sm py-0 h-11">Play</Button.Primary>
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