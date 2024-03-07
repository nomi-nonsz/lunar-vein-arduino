import { useRgbLed } from "../../hooks";
import { ChannelPinState, PinState } from "../../types/board";
import EvoInput from "../forms/EvoInput";
import Switch from "../forms/Switch";
import { MouseEventHandler, useEffect, useState } from "react";

interface HorizontalBarProps {
    pinState: ChannelPinState;
    onUpdate?: (pin: ChannelPinState) => void;
    onDelete?: () => void
}

function HorizontalBar ({ pinState, onUpdate, onDelete }: HorizontalBarProps) {
    const [red, setRed] = useState<PinState>({
        pin: pinState.red.pin.toString(),
        state: pinState.red.state
    });

    const [green, setGreen] = useState<PinState>({
        pin: pinState.green.pin.toString(),
        state: pinState.green.state
    });

    const [blue, setBlue] = useState<PinState>({
        pin: pinState.blue.pin.toString(),
        state: pinState.blue.state
    });

    useEffect(() => {
        if (onUpdate) onUpdate({red, green, blue});
    }, [red, green, blue])

    return (
        <div className="flex flex-col col-span-3 gap-2 animate-fade-in">
            <button className="ms-auto bg-finn border border-border rounded-lg px-5" onClick={onDelete}>
                <i className="bi bi-dash text-xl"></i>
            </button>
            <div className="bg-secondary animate-size-in rounded-lg border border-border p-4 flex gap-3">
                <div className="flex-1 text-center flex flex-col gap-3">
                    <div className="text-[#FF4444]">Red</div>
                    <EvoInput
                        name="pin"
                        value={red.pin.toString()}
                        type="number"
                        onChange={(e) => {
                            setRed({
                                pin: e.target.value,
                                state: red.state
                            });
                        }}
                    />
                    <Switch
                        state={red.state}
                        onChange={() => {
                            setRed({
                                pin: red.pin,
                                state: !red.state
                            })
                        }}
                    />
                </div>
                <div className="flex-1 text-center flex flex-col gap-3">
                    <div className="text-[#48FF44]">Green</div>
                    <EvoInput
                        name="pin"
                        value={green.pin.toString()}
                        type="number"
                        onChange={(e) => {
                            setGreen({
                                pin: e.target.value,
                                state: green.state
                            });
                        }}
                    />
                    <Switch
                        state={green.state}
                        onChange={() => {
                            setGreen({
                                pin: green.pin,
                                state: !green.state
                            })
                        }}
                    />
                </div>
                <div className="flex-1 text-center flex flex-col gap-3">
                    <div className="text-[#4844FF]">Blue</div>
                    <EvoInput
                        name="pin"
                        value={blue.pin.toString()}
                        type="number"
                        onChange={(e) => {
                            setBlue({
                                pin: e.target.value,
                                state: blue.state
                            });
                        }}
                    />
                    <Switch
                        state={blue.state}
                        onChange={() => {
                            setBlue({
                                pin: blue.pin,
                                state: !blue.state
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

function HorizontalBarPlus ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className="bg-finn hover:bg-secondary transition col-span-3 rounded-lg border border-border flex items-center justify-center mt-10"
            onClick={onClick}
        >
            <i className="bi bi-plus text-6xl text-border"></i>
        </button>
    )
}

function ControlRgbLed () {
    const { addLed, rgbLed, removeLed, setLed } = useRgbLed();

    const handleAdd = (): void => {
        addLed({
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
        })
    }

    return (
        <div className="container py-16" id="rgb-led">
            <div className="container-grid items-center relative">
                <div className={`col-span-8`}>
                    <h2 className="text-4xl font-poppins font-bold leading-normal mb-4">
                        RGB LED
                    </h2>
                    <div className={`grid grid-cols-9 gap-6`}>
                        {rgbLed.map((led, i) => (
                        <HorizontalBar
                            key={i}
                            pinState={led}
                            onUpdate={(newLed) => {
                                setLed(i, newLed);
                            }}
                            onDelete={() => {
                                removeLed(i);
                            }}
                        />
                        ))}
                        {rgbLed.length < 5 && <HorizontalBarPlus
                            onClick={handleAdd}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlRgbLed;