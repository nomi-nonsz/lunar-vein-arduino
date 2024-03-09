import { ChangeEventHandler } from "react";

interface SliderProps {
    className?: string;
    name?: string;
    value?: number;
    onChange?: ChangeEventHandler<HTMLInputElement | null>
}

export function Slider ({ className, name, value, onChange }: SliderProps) {
    const percent = value ? value/10 : 0

    return (
        <input
            className={`slider ${className}`}
            style={{
                background: `linear-gradient(to right, #3a3affcc ${percent}%, #3a3aff4d ${percent}%)`
            }}
            type="range"
            min={0}
            max={1000}
            name={name}
            value={value}
            onChange={onChange}
            id=""
        />
    )
}