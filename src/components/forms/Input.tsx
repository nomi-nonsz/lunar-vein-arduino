import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
    className?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    type?: HTMLInputTypeAttribute
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function Input ({
    className,
    name,
    placeholder,
    value,
    type,
    onChange
}: InputProps) {
    return (
        <input
            className={`px-4 py-2 text-left text-sm font-roboto-mono bg-finn border border-border rounded-lg ${className}`}
            placeholder={placeholder}
            type={type}
            name={name}
            id=""
            value={value}
            onChange={onChange}
        />
    )
}