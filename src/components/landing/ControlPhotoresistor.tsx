import { ChangeEvent, MouseEventHandler, Ref, useState } from "react";
import { usePhotoresistor } from "../../hooks";
import { DynamicPinState } from "../../types/board";
import CircleResistance from "../shapes/CircleResistance";
import TwoRowTab from "../info/TwoRowTab";
import EvoInput from "../forms/EvoInput";
import Button from "../forms/Button";


function Card ({ index, resistor }: { index: number, resistor: DynamicPinState }) {
    const { setResistorPin, removeResistor } = usePhotoresistor();

    const [isListen, setListen] = useState<boolean>(false);

    const resistance: number = Math.floor(resistor.state);
    const intensity: number = Math.floor(100 - (resistor.state / 1023 * 100));

    const toggleListen = () => {
        setListen(!isListen);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | null>) => {
        setResistorPin(index, e.target.value);
    }

    const handleDelete = () => {
        removeResistor(index);
    }

    return (
        <div className="border border-border bg-secondary col-span-2 rounded-lg p-6 animate-size-fade-in">
            <div className="flex justify-items-end">
                <button className="ms-auto bg-finn hover:bg-secondary transition border border-border rounded-lg px-5" onClick={handleDelete}>
                    <i className="bi bi-dash text-xl"></i>
                </button>
            </div>
            <div className="h-52 flex items-center justify-center">
                <CircleResistance
                    resistance={0}
                />
            </div>
            <div className="flex flex-col mt-3 gap-3">
                <TwoRowTab
                    prop="Resistance"
                    value={resistance}
                />
                <TwoRowTab
                    prop="Light Intensity"
                    value={`${intensity}%`}
                />
                <EvoInput
                    className="h-10"
                    name="Pin"
                    type="text"
                    value={resistor.pin.toString()}
                    onChange={(handleChange)}
                />
                {!isListen ? (
                    <Button.Primary onClick={toggleListen} className="text-sm !p-0 h-11">Start Listening</Button.Primary>
                ) : (
                    <Button.Danger onClick={toggleListen} className="text-sm !p-0 h-11">Stop Listening</Button.Danger>
                )}
            </div>
        </div>
    )
}

function CardPlus ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className="bg-finn h-[470px] hover:bg-secondary transition col-span-2 rounded-lg border border-border flex items-center justify-center"
            onClick={onClick}
        >
            <i className="bi bi-plus text-6xl text-border"></i>
        </button>
    )
}

function ControlPhotoresistor ({ refto }: { refto?: Ref<HTMLDivElement> }) {
    const { photoresistor: resistors, addResistor } = usePhotoresistor();

    const handleAdd = (): void => {
        let anopin = 5;
        for (let i = 0; i < resistors.length; i++) {
            if (resistors.filter(resistor => (resistor.pin == `A${anopin}` || resistor.pin == anopin)).length > 0) {
                anopin--;
            }
            else break;
        }
        addResistor(`A${anopin}`, 0);
    }

    return (
        <div className="container py-16" id="rgb-led" ref={refto}>
            <div className="container-grid items-center relative">
                <div className={`col-span-8`}>
                    <h2 className="text-4xl font-poppins font-bold leading-normal mb-4">
                        Photoresistor
                    </h2>
                    <div className="grid grid-cols-8 mb-8">
                        <p className="col-span-6">Also known as LDR (Light Dependent Resistor), it is an electronic component whose resistance changes based on the intensity of light it receives. The higher the light intensity, the lower the resistance, When exposed to intense light, a photoresistor experiences a decrease in resistance due to photoconduction. The molecules in the photoresistor material become more active and allow electric current to flow through the material more easily.</p>
                    </div>
                    <div className={`grid grid-cols-8 gap-6`}>
                        {resistors.map((resistor, i) => (
                        <Card
                            key={i}
                            resistor={resistor}
                            index={i}
                        />
                        ))}
                        {resistors.length < 6 && <CardPlus
                            onClick={handleAdd}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlPhotoresistor;