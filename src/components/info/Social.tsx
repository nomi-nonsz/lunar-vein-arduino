import { ReactNode } from "react";

interface SocialPops {
    className?: string;
    name: string;
    link: string;
    icon: ReactNode | string;
}

export default function Social({ className, name, link, icon }: SocialPops) {
    return (
        <a
            href={link}
            title={name}
            target="_blank"
            className={`opacity-80 transition bg-transparent hover:bg-black w-14 h-14 flex justify-center items-center rounded-full ${className}`}
        >
            {icon}
        </a>
    );
}
