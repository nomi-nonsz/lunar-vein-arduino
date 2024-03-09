import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import Switch from "./Switch";

interface PinBoxProps {
    className?: string;
    value: number | string;
    onValueChange?: ChangeEventHandler<HTMLInputElement | null>;
    onDelete?: FormEventHandler<HTMLButtonElement | null>;
    minusBtn?: boolean;
}

interface ToggleProps extends PinBoxProps {
    state: boolean;
    onStateChange?: FormEventHandler<HTMLButtonElement | null>;
}

function PinBox ({
    className,
    value,
    onValueChange,
    onDelete,
    minusBtn
}: PinBoxProps) {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
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
        </div>
    )
}

function Toggle ({
    className,
    value,
    minusBtn,
    onDelete,
    state,
    onStateChange,
    onValueChange
}: ToggleProps) {
    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            <PinBox
                value={value}
                minusBtn={minusBtn}
                onDelete={onDelete}
                onValueChange={onValueChange}
            />
            <Switch
                state={state}
                onChange={onStateChange}
            />
        </div>
    )
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

PinBox.Add = Add;
PinBox.Toggle = Toggle;

export default PinBox;