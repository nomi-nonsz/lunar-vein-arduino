import { ChangeEvent, useEffect, useState } from "react";
import EvoInput from "../forms/EvoInput";
import Input from "../forms/Input";

type EvoDropDownItem = {
    name: string,
    value: any
}

interface SearchItemModalProps {
    className?: string;
    name?: string;
    items: EvoDropDownItem[];
    initItem?: EvoDropDownItem;
    onValueChange?: (item: EvoDropDownItem) => void;
    onClose?: () => void
}

export default function SearchItemModal ({ className, items, name, initItem, onClose, onValueChange }: SearchItemModalProps) {
    const [filteredItems, setItems] = useState<EvoDropDownItem[]>(items);
    const [currentItem, setItem] = useState<EvoDropDownItem>(initItem || items[0]);

    const [searchVal, setSearch] = useState<string>("");

    const handleSearch = (e: ChangeEvent<HTMLInputElement | null>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        if (searchVal.length > 0) {
            const filter = items.filter(item => item.name.toLocaleLowerCase().includes(searchVal.toLowerCase()));
            setItems(filter);
        }
        else {
            setItems(items);
        }
    }, [searchVal])

    return (
        <div className={`fixed left-0 top-0 bg-finn w-screen h-screen z-50 ${className}`}>
            <div className="bg-black border border-border rounded-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 p-3 flex flex-col justify-items-start">
                <button className="p-1 absolute right-2 top-2" onClick={onClose}>
                    <i className="bi bi-x text-3xl"></i>
                </button>
                <header className="text-left">
                    <h1 className="text-2xl font-bold font-poppins px-2 py-4">{name}</h1>
                    <Input
                        className="w-full mb-3"
                        name="Search"
                        placeholder="Search..."
                        value={searchVal}
                        onChange={handleSearch}
                    />
                </header>
                <div className="overflow-y-scroll flex-grow flex flex-col">
                    {filteredItems.map((item) => (
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
            </div>
        </div>
    )
}