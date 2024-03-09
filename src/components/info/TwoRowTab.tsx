interface TwoRowTab {
    className?: string;
    prop?: string;
    value?: string | number;
}

export default function TwoRowTab ({ className, prop, value }: TwoRowTab) {
    return (
        <div className={`flex justify-between font-roboto-mono ${className}`}>
            <div>{prop}</div>
            <div>{value}</div>
        </div>
    )
}