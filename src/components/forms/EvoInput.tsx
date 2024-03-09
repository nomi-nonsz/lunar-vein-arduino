import { ChangeEventHandler, HTMLInputTypeAttribute, useRef } from "react";

interface EvoInputProps {
    className?: string;
    name: string;
    value: string;
    type?: HTMLInputTypeAttribute
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function EvoInput ({
    className,
    name,
    value,
    type,
    onChange
}: EvoInputProps) {
    const labelRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        labelRef.current?.focus();
    }

    return (
        <label className={`flex items-center justify-between cursor-pointer bg-finn border border-border rounded-lg ${className}`} onClick={handleClick}>
            <div className="w-fit p-2 text-sm ps-4">{name}</div>
            <input
                className="w-1/2 h-full p-2 text-center text-sm font-roboto-mono bg-transparent"
                type={type}
                name=""
                id=""
                value={value}
                ref={labelRef}
                onChange={onChange}
            />
        </label>
    )
}