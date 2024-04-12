

import React, { DetailedHTMLProps, HTMLAttributes, useContext } from 'react'
import { FormContext } from "../FormContext"

interface Props {
    name: string
    options: Array<{ text: string | any, value: string | number | any }>
}

function Switch(props: Props) {
    const { name, options } = props

    const form = useContext(FormContext)
    const {data, setData} = form

    return (
        <div className=" bg-app-input-border-light/10 p-8px flex">
            {options.map((option, i) => (
                <Option active={option.value == data[name]} label={option.text} onClick={() => setData({...data, [name]: option.value})} />
            ))}
        </div>
    )
}

interface OptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label: string,
    active: boolean
}

function Option(props: OptionProps) {

    const { label, active, ...rest } = props

    return (
        <div {...rest} className={`h-32px rounded-full w-full flex justify-center cursor-pointer items-center ${active ? "bg-app-button text-white font-semibold" : " text-app-input-border hover:opacity-75"}`}>{label}</div>
    )
}

export default Switch
