import Icon from 'components/Icon'
import React, { HTMLProps, useContext, useEffect } from 'react'
import Alert from '../Alert'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends HTMLProps<HTMLInputElement> {
    label?: string | any,
    error?: boolean,
    admin?: boolean
}

function Radio(props: Props) {
    const { className, name = "radio", label, value, error, admin = false, ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)
    const { seterrors } = useContext(ErrorGroupContext);

    const active = (data[name] == value)

    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    return (
        <>
            <label className={`flex ${admin ? "border-2" : "border"} ${error ? "bg-app-input-error border-app-input-error/10" : active ? (admin ? "border-[#F5C848]" : "bg-app-input-primary/10 border-app-button/10") : "bg-app-input-border/50 border-transparent hover:bg-opacity-100"} border p-16px rounded mb-8px flex-col relative cursor-pointer ${className}`} >
                <div className="flex items-center flex-shrink-0">
                    <input
                        className="h-0 w-0 opacity-0 absolute"
                        checked={data[name] == value}
                        {...rest}
                        type="radio"
                        name={name}
                        value={value}
                        onChange={e => { setData(name, e.target.value); clearErrors(name) }}
                    />
                    <div className={`${admin ? "border-2" : "border"} ${error ? "border-app-input-error" : active ? "border-app-button" : "border-app-input-border-dark"}  rounded-full w-18px h-18px bg-white flex items-center justify-center  flex-shrink-0`} >
                        {active &&
                            <div className="bg-app-button w-10px h-10px  rounded-full" />
                        }
                        {error &&
                            <div className="bg-app-input-error w-10px h-10px  rounded-full" />
                        }
                    </div>
                    <div className="ml-16px leading-6 w-full">{label}</div>
                </div>

            </label>
            {(errors[name]) &&
                <div className="mt-8px">
                    <Alert>{errors?.[name] ?? "Toto pole je vyplněno špatně."}</Alert>
                </div>
            }
        </>
    )
}

export default Radio
