import React, { ReactNode } from "react";

interface AlertProps {
    children: ReactNode,
    position?: "top" | "bottom"
}


export default function Alert({ children, position = "bottom" }: AlertProps) {


    return (
        <div className="w-full">
            {position == "bottom" &&
                <div className="w-full h-6px flex justify-center">
                    <div className="w-12px h-12px bg-app-input-error transform rotate-45"></div>
                </div>
            }
            <div className="w-full bg-app-input-error rounded p-24px text-white text-center justify-center items-center">{children}</div>
            {position == "top" &&
                <div className="w-full h-6px flex justify-center">
                    <div className="w-12px h-12px bg-app-input-error transform rotate-45 -translate-y-6px"></div>
                </div>
            }
        </div>
    )
}