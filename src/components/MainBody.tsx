import { ReactNode } from "react";
import BackroundImg from "../assets/img/background.png";

export default function MainBody({ children }: { children?: ReactNode }) {
    return (
        <div
            className="bg-background text-white bg-repeat-y relative"
            style={{
                backgroundImage: `url(${BackroundImg})`
            }}
        >
            {children}
        </div>
    )
}