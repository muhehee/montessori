import React from "react";


interface PinDotsProps {
    max: number,
    actual: number
}

export default function PinDots({ max, actual }: PinDotsProps) {


    return (
        <div className="flex gap-x-8px">
            {[...Array(max).keys()].map(i => (
                <Dot active={ i <= actual} />
            ))}
        </div>
    )
}

function Dot({ active }: {active: boolean }) {

    return (
        <div className={`${(active) ? "bg-app-input-primary" : " bg-app-input-border border border-app-input-border-light"} rounded-full w-12px h-12px`}></div>
    )
}