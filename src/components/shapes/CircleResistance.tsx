interface CircleResistanceProps {
    className?: string;
    width?: number;
    height?: number;
    blur?: number;
    intensity?: number;
}

export default function CircleResistance({
    className,
    width,
    height,
    blur,
    intensity,
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
                className="transition-opacity duration-75"
                style={{
                    backgroundColor: "white",
                    borderRadius: 999,
                    width: width || 122,
                    height: height || 122,
                    filter: `blur(${blur || 12}px)`,
                    boxShadow: '0 0 52px 22px #FF2929',
                    opacity: intensity+"%"
                }}
            ></div>
        </div>
    );
}
