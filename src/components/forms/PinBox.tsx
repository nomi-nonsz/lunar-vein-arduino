import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import Switch from "./Switch";

interface PinBoxProps {
    value: number | string;
    state: boolean;
    onValueChange?: ChangeEventHandler<HTMLInputElement | null>
    onStateChange?: FormEventHandler<HTMLButtonElement | null>
}

function Add ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button className="bg-finn hover:bg-secondary transition border border-border rounded-lg flex items-center justify-center h-36" onClick={onClick}>
            <i className="bi bi-plus text-border text-7xl"></i>
        </button>
    )
}

function PinBox ({ value, state, onValueChange, onStateChange }: PinBoxProps) {
    return (
        <div className="flex flex-col gap-3 animate-fade-in">
            <div className="bg-secondary border border-border rounded-lg flex flex-col h-36 animate-size-in">
                <div className="font-roboto-mono py-4 text-center">Pin</div>
                <input
                    className="flex-grow bg-transparent border-none text-center text-3xl font-roboto-mono"
                    type="number"
                    name="pinbox"
                    id=""
                    value={value}
                    onChange={onValueChange}
                />
            </div>
            <Switch
                state={state}
                onChange={onStateChange}
            />
        </div>
    )
}

PinBox.Add = Add;

export default PinBox;