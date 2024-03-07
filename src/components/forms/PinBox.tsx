import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import Switch from "./Switch";

interface PinBoxProps {
    className?: string;
    value: number | string;
    state: boolean;
    onValueChange?: ChangeEventHandler<HTMLInputElement | null>;
    onStateChange?: FormEventHandler<HTMLButtonElement | null>;
    onDelete?: FormEventHandler<HTMLButtonElement | null>;
    minusBtn?: boolean;
}

function Add ({
    className,
    onClick
}: {
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <button className={`bg-finn hover:bg-secondary transition border border-border rounded-lg flex items-center justify-center h-36 ${className}`} onClick={onClick}>
            <i className="bi bi-plus text-border text-7xl"></i>
        </button>
    )
}

function PinBox ({
    className,
    value,
    state,
    onValueChange,
    onStateChange,
    onDelete,
    minusBtn
}: PinBoxProps) {
    return (
        <div className={`flex flex-col gap-3 animate-fade-in ${className}`}>
            {minusBtn && <button
                className="border bg-transparent ms-auto hover:bg-secondary border-border rounded px-2"
                onClick={onDelete}
                
            >
                <i className="bi bi-dash"></i>
            </button>}
            <div className="bg-secondary border border-border rounded-lg flex flex-col h-36 animate-size-in relative">
                <div className="font-roboto-mono py-4 text-center">
                    Pin
                </div>
                <input
                    className="flex-grow bg-transparent pb-6 border-none text-center text-3xl font-roboto-mono"
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