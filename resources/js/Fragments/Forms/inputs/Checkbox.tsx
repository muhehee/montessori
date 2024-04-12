import { Check } from '@phosphor-icons/react'
import React, { HTMLProps, useContext, useEffect } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends HTMLProps<HTMLInputElement> {
    label?: string | any
    name: string | any
}

function Checkbox(props: Props) {
    const { label, className, name = "checkbox", ...rest } = props
    const { data, setData, errors, clearErrors } = useContext(FormContext)

    const { seterrors } = useContext(ErrorGroupContext);

    const active = (data[name] == true)

    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    return (
        <label className={`flex shadow-md ${"border-app-input-border bg-opacity-50 hover:bg-opacity-100"} border p-8px rounded flex-col relative cursor-pointer ${className}`} >
            <div className="flex items-center">
                <input
                    className="h-0 w-0 opacity-0 absolute"
                    {...rest}
                    type="checkbox"
                    name={name}
                    // value={data[name] ?? ""}
                    checked={data[name] === true}
                    onChange={e => { setData(name, e.target.checked); clearErrors(name) }}
                />
                <div className={`border ${active ? "border-app-input-primary bg-app-input-primary" : "border-app-input-border bg-white"}  rounded-sm text-white w-18px h-18px flex items-center justify-center flex-shrink-0`} >
                    {active &&
                        <Check weight='bold' />
                    }
                </div>
                <div className="ml-8px leading-6">{label}</div>
            </div>
            {
                errors[name] &&
                <div className={`h-12px text-xs text-app-input-error ${errors[name] ? "" : "opacity-0"}`}>{errors?.[name]}</div>
            }
        </label>
    )
}

export default Checkbox
