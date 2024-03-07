import { ReactNode } from "react";

interface ControlSectionProps {
    title: string;
    description?: string;
    id?: string;
    stack: ReactNode;
    colSpan?: number;
    stackType?: 'grid' | 'flex'
}

export default function ControlSection ({
    title,
    description,
    id,
    stack
}: ControlSectionProps) {
    return (
        <div className="container py-16" id={id}>
            <div className="container-grid items-center relative">
                <div className={`col-span-6`}>
                    <h2 className="text-4xl font-poppins font-bold leading-normal mb-4">
                        {title}
                    </h2>
                    <p>{description}</p>
                    <div className={`flex flex-wrap gap-6`}>
                        {stack}
                    </div>
                </div>
            </div>
        </div>
    )
}