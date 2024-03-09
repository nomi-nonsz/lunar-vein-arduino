import { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    className?: string;
    style?: CSSProperties,
    onClick?: MouseEventHandler
    children?: ReactNode
}

function Primary ({
    className,
    style,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            className={`px-5 py-4 transition font-roboto-mono bg-primary bg-opacity-100 hover:bg-opacity-80 rounded-lg ${className}`}
            style={style}
            onClick={onClick}
        >{children}</button>
    )
}

function Secondary ({
    className,
    style,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            className={`px-5 py-4 transition font-roboto-mono bg-finn border hover:bg-secondary border-border rounded-lg ${className}`}
            style={style}
            onClick={onClick}
        >{children}</button>
    )
}

function Button ({
    className,
    style,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            className={`px-5 py-4 transition font-roboto-mono bg-finn border hover:bg-secondary border-border rounded-lg ${className}`}
            style={style}
            onClick={onClick}
        >{children}</button>
    )
}

Button.Primary = Primary;
Button.Secondary = Secondary;

export default Button;