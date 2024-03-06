import { FormEventHandler } from "react";

export default function Switch ({ state, onChange }: { state: boolean, onChange?: FormEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className={`border switch ${state ? 'switch-on' : 'switch-off'}`}
            onClick={onChange}
        >
            <div className="handler w-1/2 font-roboto-mono">OFF</div>
            <input type="hidden" name="" className="hidden" />
        </button>
    )
}