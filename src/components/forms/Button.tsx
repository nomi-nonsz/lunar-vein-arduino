import { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface InButton {
    className?: string;
    style?: CSSProperties,
    onClick?: MouseEventHandler
    children?: ReactNode
}

export default function Button ({
    className,
    style,
    onClick,
    children
}: InButton) {
    return (
        <button
            className={`px-5 py-4 transition font-roboto-mono bg-finn border hover:bg-secondary border-border rounded-lg ${className}`}
            style={style}
            onClick={onClick}
        >{children}</button>
    )
}