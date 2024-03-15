import { FocusEvent, useState } from "react";

type EvoDropDownItem = {
    name: string,
    value: any
}

interface EvoDropDownProps {
    className?: string;
    name?: string;
    items: EvoDropDownItem[];
    initItem?: EvoDropDownItem;
    onValueChange?: (item: EvoDropDownItem) => void;
    onBlur?: (e: FocusEvent) => void
}

interface MenuProps extends EvoDropDownProps {
    appear: boolean;
}

function Menu ({ className, items, initItem, appear, onValueChange, onBlur }: MenuProps) {
    const [currentItem, setItem] = useState<EvoDropDownItem>(initItem || items[0]);

    return (
        <div className={`absolute p-2 flex flex-col w-full bg-black border mt-3 border-border rounded-lg ${appear ? "block" : "hidden"} ${className}`} onBlur={onBlur}>
            {items.map((item) => (
                <button
                    className="py-2 px-3 flex justify-between items-center bg-transparent bg-opacity-100 hover:bg-indigo-300 hover:bg-opacity-20 rounded-md"
                    onClick={() => {
                        setItem(item);
                        if (onValueChange) onValueChange(item)}
                    }
                >
                    <div className="text-left text-sm">
                        {item.name}
                    </div>
                    {currentItem.value == item.value && <div className="rounded-full bg-white w-2 h-2"></div>}
                </button>
            ))}
        </div>
    )
}

function EvoDropDown ({ className, name, items, initItem, onValueChange }: EvoDropDownProps) {
    const [appear, setAppear] = useState<boolean>(false);
    const [currentItem, setItem] = useState<EvoDropDownItem>(initItem || items[0]);

    const handleClick = () => {
        setAppear(!appear);
    }

    return (
        <div className="relative">
            <button className={`flex items-center justify-between cursor-pointer bg-finn border border-border rounded-lg ${className}`} onClick={handleClick}>
                <div className="w-fit p-2 text-sm ps-4">{name}</div>
                <div className="w-1/2 h-full p-2 text-right pe-4 text-sm font-roboto-mono bg-transparent">
                    {currentItem.name}
                </div>
            </button>
            <div className={`absolute p-2 flex flex-col w-full bg-black border mt-3 border-border rounded-lg ${appear ? "block" : "hidden"}`}>
                {items.map((item) => (
                    <button
                        className="py-2 px-3 flex justify-between items-center bg-transparent bg-opacity-100 hover:bg-indigo-300 hover:bg-opacity-20 rounded-md"
                        onClick={() => {
                            setAppear(false);
                            setItem(item);
                            if (onValueChange) onValueChange(item)}
                        }
                    >
                        <div className="text-left text-sm">
                            {item.name}
                        </div>
                        {currentItem.value == item.value && <div className="rounded-full bg-white w-2 h-2"></div>}
                    </button>
                ))}
            </div>
        </div>
    )
}

EvoDropDown.Menu = Menu;

export default EvoDropDown;