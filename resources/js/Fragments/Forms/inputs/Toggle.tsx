import Icon from 'components/Icon'
import React, { HTMLProps, ReactElement, useContext, useEffect } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"
import Alert from '../Alert'

interface Props extends HTMLProps<HTMLInputElement> {
    label?: string | any,
    icon?: ReactElement,
    admin?: boolean,
    noPadding?: boolean
}

function Toggle(props: Props) {
    const { label, icon, className, admin = false, name = "checkbox", noPadding = false, ...rest } = props
    const { data, setData, errors, clearErrors } = useContext(FormContext)
    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    let on = data?.[name]

    return (
        <label className={`relative cursor-pointer ${className}`} >
            <div className={`flex justify-between items-center py-16px ${!admin && "bg-app-input-border-light/10 hover:bg-opacity-75"}  rounded ${noPadding ? "" : "px-12px"} gap-x-8px w-full`}>
                <div className="leading-6 flex items-center gap-x-8px">
                    {icon}
                    {label}
                </div>
                <input
                    className="h-0 w-0 opacity-0 absolute"
                    {...rest}
                    type="checkbox"
                    name={name}
                    checked={data[name] === true ?? false}
                    onChange={e => { setData(name, e.target.checked); clearErrors(name) }}
                />
                <span className={`flex-shrink-0 relative rounded-full w-48px transition-all duration-300 h-24px p-0 ${on ? "bg-app-input-primary/25" : " bg-app-input-border-light/20 "} flex items-center relative`} >
                    <div className={`${on ? "flex-grow" : ""} transition-all duration-300 pointer-events-none`} />
                    <div className={` flex-shrink-0 transition-all duration-300 flex-grow- w-24px h-24px ${on ? "bg-app-input-primary" : " bg-app-input-border-light"} rounded-full`} />
                </span>
            </div>
            {(errors[name]) &&
                <div className="mt-8px">
                    <Alert>{errors?.[name] ?? "Toto pole je vyplněno špatně."}</Alert>
                </div>
            }
        </label>
    )
}

export default Toggle
