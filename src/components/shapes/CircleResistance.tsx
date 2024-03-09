interface CircleResistanceProps {
    className?: string;
    width?: number;
    height?: number;
    blur?: number;
    resistance?: number;
}

export default function CircleResistance({
    className,
    width,
    height,
    blur,
    resistance,
}: CircleResistanceProps) {
    return (
        <div
            className={className}
            style={{
                borderRadius: 999,
                width: width || 122,
                height: height || 122,
                backgroundColor: "rgba(255, 255, 255, 0.20)",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: 999,
                    width: width || 122,
                    height: height || 122,
                    filter: `blur(${blur || 12}px)`,
                    boxShadow: '0 0 52 22 #FF2929',
                    opacity: resistance ? resistance/1023*100 : 0
                }}
            ></div>
        </div>
    );
}
