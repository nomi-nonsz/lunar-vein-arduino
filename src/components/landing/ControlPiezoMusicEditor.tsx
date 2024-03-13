import { ChangeEvent, MouseEventHandler, useState } from "react";
import { usePiezoMusic } from "../../hooks";
import { PiezoMusic } from "../../types/board";
import EvoInput from "../forms/EvoInput";
import Input from "../forms/Input";
import EvoDropDown from "../forms/EvoDropDown";
import Button from "../forms/Button";
import { pitch } from "../../data/melodies";
import { PatchPiezoMusic } from "../../controllers/BoardController";

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
    const { changeNote } = usePiezoMusic();

    const [dropAppear, setApper] = useState<boolean>(false);

    const noteItems = getNoteItems();
    const toggleDropdown = () => { setApper(!dropAppear) };
    const handleChange = (item: { name: string, value: any }) => {
        changeNote(parentIndex, index, item.value);
    }

    return (
        <button className="min-w-40 h-40 transition border border-border rounded-lg hover:bg-finn animate-size-fade-in" onClick={toggleDropdown}>
            <div className="text-xl">
                {note}
            </div>
            <EvoDropDown.Menu
                className="!w-32 top-1 h-56 z-30 overflow-y-scroll v-scrollbar"
                appear={dropAppear}
                items={noteItems}
                onValueChange={handleChange}
            />
        </button>
    )
}

function NotePlus ({ parentIndex }: { parentIndex: number }) {
    const { addNote } = usePiezoMusic();
    const [dropAppear, setApper] = useState<boolean>(false);

    const noteItems = getNoteItems();
    const toggleDropdown = () => { setApper(!dropAppear) };

    const handleAddNote = (item: { name: string, value: any }) => {
        addNote(parentIndex, item.value);
    }

    return (
        <button className="border border-border bg-secondary-solid rounded-lg min-w-40 h-40" onClick={toggleDropdown}>
            <i className="bi bi-plus text-2xl"></i>
            <EvoDropDown.Menu
                className="!w-32 top-1 h-56 z-30 overflow-y-scroll v-scrollbar"
                appear={dropAppear}
                items={noteItems}
                onValueChange={handleAddNote}
            />
        </button>
    )
}

function PiezoEditor ({ piezo, index }: { piezo: PiezoMusic, index: number }) {
    const { setName, setPin, setBeat, setTempo } = usePiezoMusic();

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
        play: () => {
            PatchPiezoMusic(piezo);
        }
    }

    return (
        <div className="flex flex-col gap-5 bg-secondary border border-border rounded-lg p-5 animate-size-fade-in">
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
                    <Button.Secondary className="!py-0 !px-6 flex items-center gap-3">
                        <div className="text-sm">Export</div>
                        <i className="bi bi-upload text-sm"></i>
                    </Button.Secondary>
                    <Button.Primary className="!py-1 !px-8" onClick={handle.play}>
                        <i className="bi bi-play-fill"></i>
                    </Button.Primary>
                </div>
            </div>
            <div className="relative">
                <div className="v-scrollbar flex flex-row flex-nowrap gap-4 overflow-x-scroll overflow-y-hidden relative">
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

function BarPlus ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className="bg-finn h-36 hover:bg-secondary transition col-span-2 rounded-lg border border-border flex items-center justify-center"
            onClick={onClick}
        >
            <i className="bi bi-plus text-6xl text-border"></i>
        </button>
    )
}

function ControlPiezoMusicEditor () {
    const { piezeNotes, addPiezo } = usePiezoMusic();

    const handleAdd = (): void => {
        let anopin = 13;
        for (let i = 0; i < piezeNotes.length; i++) {
            if (piezeNotes.filter(piezo => piezo.pin == anopin).length > 0) {
                anopin--;
            }
            else break;
        }
        addPiezo({
            name: "test",
            pin: anopin,
            notes: [],
            beats: 1/4,
            tempo: 100
        });
    }

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
                    <BarPlus onClick={handleAdd} />
                </div>
            </div>
        </div>
    )
}

export default ControlPiezoMusicEditor;