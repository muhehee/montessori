import Icon from 'components/Icon'
import { Eye, EyeClosed, LockKey, WarningCircle } from '@phosphor-icons/react'
import React, { InputHTMLAttributes, useContext, useEffect, useState } from 'react'
import Alert from '../Alert'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    name: string
}

function PasswordField(props: Props) {
    const { label, className, name, ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)
    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])
    const [show, setShow] = useState(false)

    return (
        <label className={("w-full relative flex flex-col box-border ")}>
            {(data[name]?.length > 0 && label?.length > 0) &&
                <span className={` text-app-input-placeholder absolute top-8px left-40px text-xs font-muli`}>
                    {label}
                </span>
            }

            <div className="w-48px h-48px flex text-app-input-placeholder items-center justify-center absolute left-0 top-0">
                <LockKey />
            </div>
            <input
                className={`border ${(errors[name]) ? "border-app-input-error focus:border-app-input-error-dark focus:ring-app-input-error-dark/25" : `border-app-input-border hover:border-app-input-border-dark focus:border-app-input-border-dark/20 focus:ring-app-input-border/30 `}  focus:ring-4 rounded bg-white shadow-none placeholder-app-input-placeholder h-48px flex w-full items-center pl-40px ${errors[name] ? "pr-[75px]" : "pr-40px"} ${data[name]?.length > 0 ? " pb-0 pt-12px" : ""} outline-none ${className}`}
                type={show ? "text" : "password"}
                {...rest}
                name={name}
                placeholder={label}
                value={data[name] ?? ""}
                onChange={e => { setData(name, e.target.value); clearErrors(name) }}
            />
            <div className="aboslute right-0 top-0 bottom-0 w-48px p-1px">
                <div className="bg-white w-full h-full"></div>
            </div>

            <div className={(`bg-app-button cursor-pointer absolute top-0 right-0 gap-x-8px px-12px h-48px p-1px flex justify-center items-center text-app-input-border`)}>
                <div onClick={(e) => { e.preventDefault(); setShow(!show) }} className="text-white">
                    {show ? <EyeClosed /> : <Eye />}
                </div>
                {
                    (errors[name]) &&
                    <div className="text-app-input-error">
                        <WarningCircle weight="fill" />
                    </div>
                }
            </div>

            {(errors[name]) &&
                <div className="mt-8px">
                    <Alert>{errors?.[name] ?? "Toto pole je vyplněno špatně."}</Alert>
                </div>
            }
        </label>
    )
}

export default PasswordField
