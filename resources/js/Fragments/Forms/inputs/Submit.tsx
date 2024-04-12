import React, { InputHTMLAttributes, useContext, useEffect, useRef } from 'react'
import { FormContext } from "../FormContext";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    mini?: boolean
    color?: string
    disabledWhite?: boolean
    primary?: boolean
    outlined?: boolean
}

function Submit(props: Props) {
    const { className, disabled, title, mini, color, disabledWhite, primary, outlined, ...rest } = props

    const { processing } = useContext(FormContext)
    const input = useRef() as any

    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            e.preventDefault()
            input?.current?.click()
        }
    }

    useEffect(() => {
        try {
            window?.addEventListener('keydown', closeOnEsc)
        } catch (error) { }


        return () => {
            try {
                window?.removeEventListener('keydown', closeOnEsc)
            } catch (error) { }
        }
    }, [])

    return (
        <input {...rest} ref={input} type="submit" className={`w-full ${mini ? "h-32px px-16px rounded-full" : "h-48px px-24px rounded"} flex whitespace-nowrap justify-center items-center ${disabled ? `${disabledWhite ? "bg-white border border-app-input-border text-black opacity-40":"bg-app-button-light"} pointer-events-none text-app-mid cursor-not-allowed ` : (primary ? (outlined ? " bg-white  hover:bg-app-button-light text-app-button hover:text-white border-app-button border cursor-pointer" : " bg-app-button hover:bg-app-button-light text-white cursor-pointer") : `${color?`text-white bg-[${color}] border border-[${color}] hover:bg-opacity-80`:"text-black bg-white border border-app-input-border hover:border-app-input-border-dark"} cursor-pointer`)} gap-x-8px font-semibold ${className}`} />
    );
}

export default Submit
