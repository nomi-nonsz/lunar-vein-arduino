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
            className={`btn bg-primary bg-opacity-100 hover:bg-opacity-80 ${className}`}
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
            className={`btn bg-finn border hover:bg-secondary border-border ${className}`}
            style={style}
            onClick={onClick}
        >{children}</button>
    )
}


function Danger ({
    className,
    style,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            className={`btn bg-transparent border text-danger hover:bg-danger hover:text-white border-danger ${className}`}
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
            className={`btn bg-finn border hover:bg-secondary border-border ${className}`}
            style={style}
            onClick={onClick}
        >{children}</button>
    )
}

Button.Primary = Primary;
Button.Secondary = Secondary;
Button.Danger = Danger;

export default Button;