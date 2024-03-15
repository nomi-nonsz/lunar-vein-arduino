import { ChangeEvent, MouseEventHandler, Ref, useEffect, useState } from "react";
import { useServo } from "../../hooks";
import { DynamicPinState } from "../../types/board";
import EvoInput from "../forms/EvoInput";
import Button from "../forms/Button";
import { Slider } from "../forms/Slider";
import { PatchServo } from "../../controllers/BoardController";


function Bar ({ index, servo }: { index: number, servo: DynamicPinState }) {
    const { setServoPin, setDegree, removeServo } = useServo();

    const [percentage, setPercent] = useState(0);
    const [isListen, setListen] = useState(false);

    useEffect(() => {
        const deg = Math.floor((percentage / 1000) * 180);
        setDegree(servo.pin, deg);
    }, [percentage]);

    useEffect(() => {
        if (isListen) PatchServo(servo.pin, servo.state);
    }, [isListen, servo.state])

    const toggleListen = () => {
        setListen(!isListen);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | null>) => {
        const percent = Number.parseInt(e.target.value);
        if (!Number.isNaN(percent)) setPercent(percent);
    }

    const handleChangePin = (e: ChangeEvent<HTMLInputElement | null>) => {
        setServoPin(index, e.target.value);
    }

    const handleDelete = () => {
        removeServo(index);
    }

    return (
        <div className="border border-border bg-secondary rounded-lg p-6 animate-size-fade-in relative">
            <button className="ms-auto absolute -right-24 top-1/2 -translate-y-1/2 bg-finn hover:bg-secondary transition border border-border rounded-lg px-5" onClick={handleDelete}>
                <i className="bi bi-dash text-3xl"></i>
            </button>
            <div className="flex justify-between mb-8">
                <div className="flex gap-3">
                    <EvoInput
                        name="Pin"
                        value={servo.pin.toString()}
                        onChange={handleChangePin}
                        type="text"
                    />
                    {!isListen ? (
                        <Button.Primary onClick={toggleListen} className="text-sm !py-0 h-11">Start</Button.Primary>
                    ) : (
                        <Button.Danger onClick={toggleListen} className="text-sm !py-0 h-11">Stop</Button.Danger>
                    )}
                </div>
                <div className="">{servo.state+"°"}</div>
            </div>
            <div className="">
                <Slider
                    name={`Servo ${servo.pin}`}
                    value={percentage}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

function BarPlus ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className="bg-finn h-36 hover:bg-secondary transition col-span-2 rounded-lg border border-border flex items-center justify-center"
            onClick={onClick}
        >
            <i className="bi bi-plus text-6xl text-border"></i>
        </button>
    )
}

function ControlServo ({ refto }: { refto?: Ref<HTMLDivElement> }) {
    const { motoServo, addServo } = useServo();

    const handleAdd = (): void => {
        let anopin = 5;
        for (let i = 0; i < motoServo.length; i++) {
            if (motoServo.filter(servo => (servo.pin == `A${anopin}` || servo.pin == anopin)).length > 0) {
                anopin--;
            }
            else break;
        }
        addServo(`A${anopin}`, 0);
    }

    return (
        <div className="container py-16" id="rgb-led" ref={refto}>
            <div className="container-grid items-center relative">
                <div className={`col-span-8`}>
                    <h2 className="text-4xl font-poppins font-bold leading-normal mb-4">
                        Servo
                    </h2>
                    <div className="grid grid-cols-8 mb-8">
                        <p className="col-span-6">Servo motors is a type of electric motor designed to provide precise motion and accurate control. Servo motors use a feedback mechanism to control their shaft position and rotational speed.</p>
                    </div>
                    <div className={`flex flex-col gap-6`}>
                        {motoServo.map((servo, i) => (
                        <Bar
                            key={i}
                            servo={servo}
                            index={i}
                        />
                        ))}
                        {motoServo.length < 6 && <BarPlus
                            onClick={handleAdd}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlServo;