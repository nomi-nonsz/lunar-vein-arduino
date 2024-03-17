import { ChangeEvent, useState } from "react";
import { usePiezoMusic } from "../../hooks";
import { PiezoMusic } from "../../types/board";
import EvoInput from "../forms/EvoInput";
import Input from "../forms/Input";
import EvoDropDown from "../forms/EvoDropDown";
import Button from "../forms/Button";
import { pitch } from "../../data/melodies";
import { PatchPiezoMusic } from "../../controllers/BoardController";
import SearchItemModal from "../modals/SearchItemModal";

function getNoteItems () {
    const pitches = Object.keys(pitch);
    const notes = pitches.map(n => {
        const note = n.replace("S", "#");
        return {name: note, value: note}
    })
    const additional = [
        {
            name: ". (Jump note)",
            value: "."
        },
        {
            name: "- (Hold note)",
            value: "-"
        }
    ]
    return [...additional, ...notes];
}

function NoteItem ({note, index, parentIndex}: { note: string, index: number, parentIndex: number }) {
    const { changeNote, removeNote } = usePiezoMusic();

    const [dropAppear, setApper] = useState<boolean>(false);

    const noteItems = getNoteItems();
    const toggleDropdown = () => { setApper(!dropAppear) };

    const handleChange = (item: { name: string, value: any }) => {
        toggleDropdown();
        changeNote(parentIndex, index, item.value);
    }

    const handleRemove = () => {
        removeNote(parentIndex, index);
    }

    return (
        <>
        <button
            className="min-w-32 h-32 transition border group border-border rounded-lg animate-size-fade-in relative"
        >
            <div className="absolute right-2 top-2 flex gap-1">
                <button
                    className="border w-8 h-8 border-border transition hover:bg-finn rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    onClick={toggleDropdown}
                >
                    <i className="bi bi-pencil text-xs"></i>
                </button>
                <button
                    className="border w-8 h-8 border-border transition hover:bg-finn rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    onClick={handleRemove}
                >
                    <i className="bi bi-dash"></i>
                </button>
            </div>
            <div className="text-xl">
                {note}
            </div>
            {/* <EvoDropDown.Menu
                className="!w-44 top-0 h-40 z-30 overflow-y-scroll v-scrollbar left-2"
                appear={dropAppear}
                items={noteItems}
                onValueChange={handleChange}
            /> */}
        </button>

        {dropAppear == true && <SearchItemModal
            name="Edit Piezo Note"
            items={noteItems}
            initItem={{ name: note.replace("S", "#"), value: note.replace("S", "#") }}
            onValueChange={handleChange}
            onClose={toggleDropdown}
        />}
        </>
    )
}

function NotePlus ({ parentIndex }: { parentIndex: number }) {
    const { addNote } = usePiezoMusic();
    const [dropAppear, setApper] = useState<boolean>(false);

    const noteItems = getNoteItems();
    const toggleDropdown = () => { setApper(!dropAppear) };

    const handleAddNote = (item: { name: string, value: any }) => {
        addNote(parentIndex, item.value);
        setApper(false);
    }

    return (
        <>
            <button className="border border-border bg-secondary-solid rounded-lg min-w-32 h-32" onClick={toggleDropdown}>
                <i className="bi bi-plus text-2xl"></i>
                {/* <EvoDropDown.Menu
                    className="!w-32 top-0 h-56 z-30 overflow-y-scroll v-scrollbar"
                    appear={dropAppear}
                    items={noteItems}
                    onValueChange={handleAddNote}
                /> */}
            </button>
            {dropAppear == true && <SearchItemModal
                name="Add Piezo Note"
                items={noteItems}
                onValueChange={handleAddNote}
                onClose={toggleDropdown}
            />}
        </>
    )
}

function PiezoEditor ({ piezo, index }: { piezo: PiezoMusic, index: number }) {
    const { setName, setPin, setBeat, setTempo, removePiezo } = usePiezoMusic();

    const beatsItem = [
        {
            name: "1/2",
            value: 1/2
        },
        {
            name: "1/4",
            value: 1/4
        },
        {
            name: "1/8",
            value: 1/8
        },
        {
            name: "1/16",
            value: 1/16
        }
    ];

    const initBeatItem = beatsItem.find((item) => item.value == piezo.beats);

    const exportJson = () => {
        const filename = "piezo-music_" + piezo.name
            .toLocaleLowerCase()
            .split("")
            .map(char => char == " " ? "-" : char)
            .join("") + ".json"

        const json = JSON.stringify(piezo, null, 4);
        const blob = new Blob([json], {
            type: "application/json; charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute("href", url);
        link.setAttribute("download", filename);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handle = {
        changeName: (e: ChangeEvent<HTMLInputElement | null>) => {
            setName(index, e.target.value);
        },
        pinChange: (e: ChangeEvent<HTMLInputElement | null>) => {
            setPin(index, e.target.value);
        },
        beatChange: (item: { name: string, value: any }) => {
            setBeat(index, item.value);
        },
        tempoChange: (e: ChangeEvent<HTMLInputElement | null>) => {
            const tempo = Number.parseInt(e.target.value);
            setTempo(index, tempo);
        },
        remove: () => {
            removePiezo(index);
        },
        play: () => {
            PatchPiezoMusic(piezo);
        },
        export: exportJson
    }

    return (
        <div className="flex flex-col gap-5 bg-secondary border border-border rounded-lg p-5 animate-size-fade-in relative">
            <button className="ms-auto absolute -right-24 top-1/2 -translate-y-1/2 bg-finn hover:bg-secondary transition border border-border rounded-lg px-5" onClick={handle.remove}>
                <i className="bi bi-dash text-3xl"></i>
            </button>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                    <Input
                        className="w-64"
                        placeholder="Enter name"
                        value={piezo.name}
                        onChange={handle.changeName}
                    />
                    <EvoInput
                        className="w-36"
                        name="Pin"
                        type="number"
                        value={piezo.pin.toString()}
                        onChange={handle.pinChange}
                    />
                    <EvoDropDown
                        className="w-36"
                        name="Beats"
                        items={beatsItem}
                        initItem={initBeatItem}
                    />
                    <EvoInput
                        className="w-36"
                        name="Tempo"
                        type="number"
                        value={piezo.tempo.toString()}
                        onChange={handle.tempoChange}
                    />
                </div>
                <div className="flex flex-row gap-3">
                    <Button.Secondary className="!py-0 !px-6 flex items-center gap-3" onClick={exportJson}>
                        <div className="text-sm">Export</div>
                        <i className="bi bi-upload text-sm"></i>
                    </Button.Secondary>
                    <Button.Primary className="!py-1 !px-8" onClick={handle.play}>
                        <i className="bi bi-play-fill"></i>
                    </Button.Primary>
                </div>
            </div>
            <div className="relative">
                <div className="v-scrollbar pb-4 flex flex-row flex-nowrap gap-4 overflow-x-scroll overflow-y-hidden relative">
                    {piezo.notes.map((note, i) => (
                        <NoteItem
                            note={note}
                            index={i}
                            parentIndex={index}
                            key={i}
                        />
                    ))}
                    <NotePlus parentIndex={index} />
                </div>
            </div>
        </div>
    )
}

function PiezoBarPlus () {
    const { addPiezo } = usePiezoMusic();

    const handleAdd = (): void => {
        addPiezo({
            name: "",
            pin: 11,
            notes: [],
            beats: 1/4,
            tempo: 100
        });
    }

    const handleImport = (e: ChangeEvent<HTMLInputElement | null>): void => {
        const file: File | null = e.target.files ? e.target.files[0] : null;
        
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target ? event.target.result : null;
            
            if (result && typeof result == "string") {
                const data: PiezoMusic = JSON.parse(result);
                const isValidFormat: boolean = data.name != null && data.pin != null && data.notes != null && data.beats != null && data.tempo != null;

                if (isValidFormat) addPiezo(data);
            }
        }
        reader.readAsText(file);
    }

    return (
        <div className="flex flex-row gap-5">
            <button
                className="bg-finn h-36 flex-1 hover:bg-secondary transition col-span-2 rounded-lg border text-border border-border hover:border-slate-400 hover:text-slate-400 flex items-center justify-center"
                onClick={handleAdd}
            >
                <i className="bi bi-plus text-5xl"></i>
                <div className="font-roboto-mono text-lg">Add New</div>
            </button>
            <label
                htmlFor="file"
                className="bg-finn h-36 flex-1 hover:bg-secondary transition col-span-2 rounded-lg border text-border border-border hover:border-slate-400 hover:text-slate-400 flex items-center justify-center cursor-pointer"
            >
                <input type="file" id="file" className="hidden" onChange={handleImport} />
                <i className="bi bi-download text-3xl me-3"></i>
                <div className="font-roboto-mono text-lg">Import</div>
            </label>
        </div>
    )
}

function ControlPiezoMusicEditor () {
    const { piezeNotes } = usePiezoMusic();

    return (
        <div className="container grid items-center relative">
            <div className={`col-span-8 w-[inherit]`}>
                <h2 className="text-4xl font-poppins font-bold leading-normal mb-4">
                    Piezo Music Editor
                </h2>
                <div className="grid grid-cols-8 mb-8">
                    <p className="col-span-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis rem, perspiciatis voluptatibus dolor officiis voluptas asperiores reiciendis quisquam qui numquam quas illum velit in id, est expedita ipsa voluptatum eligendi?</p>
                </div>
                <div className={`flex flex-col gap-6`}>
                    {piezeNotes.map((piezo, i) => (
                        <PiezoEditor
                            piezo={piezo}
                            index={i}
                            key={i}
                        />
                    ))}
                    <PiezoBarPlus />
                </div>
            </div>
        </div>
    )
}

export default ControlPiezoMusicEditor;