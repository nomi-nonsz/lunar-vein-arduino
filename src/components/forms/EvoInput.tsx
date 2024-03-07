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
        <label className={`flex cursor-pointer bg-finn border border-border rounded-lg ${className}`} onClick={handleClick}>
            <div className="flex-1 w-1/2 p-2">{name}</div>
            <input
                className="flex-1 w-1/2 h-full p-2 text-center bg-transparent"
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