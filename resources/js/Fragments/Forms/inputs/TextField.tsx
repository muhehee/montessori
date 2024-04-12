
import { CheckCircle, Spinner, WarningCircle } from '@phosphor-icons/react'
import React, { InputHTMLAttributes, ReactElement, useContext, useEffect, useState } from 'react'
import Alert from '../Alert'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    name: string
    labelClassName?: string
    wraperClassName?: string
    noCheck?: boolean
    clearSelection?: boolean,
    icon?: ReactElement,
    forceCheck?: boolean
    noBorder?: boolean,
    type?: string,
    mini?: boolean
    placeholder?: string | any
}

function TextField(props: Props) {
    const { icon, mini, label, className, name, labelClassName, placeholder, disabled, noBorder = false, noCheck = false, wraperClassName, clearSelection = false, forceCheck, type, ...rest } = props

    const { data, setData, errors, clearErrors, processing, wasSuccessful, isDirty } = useContext(FormContext)
    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    const check = (forceCheck || (wasSuccessful && isDirty)) ? true : false

    return (
        <label className={`w-full relative flex flex-col box-border ${wraperClassName}`}>
            {(data[name]?.length > 0 && label?.length > 0 && !mini) &&
                <span className={` text-app-input-placeholder absolute top-8px ${icon ? "left-40px" : "left-12px"} text-xs text-12`}>
                    {label}
                </span>
            }
            {icon &&
                <div className={` ${mini ? "w-32px h-32px" : "w-48px h-48px"} flex items-center justify-center absolute left-0 top-0`}>
                    {icon}
                </div>
            }
            <input
                className={`border ${(errors[name]) ? "border-app-input-error focus:border-app-input-error focus:ring-app-input-error focus:ring-opacity-25" : (check && !noCheck) ? "border-app-input-primary focus:border-app-input-primary focus:ring-app-input-primarya focus:ring-opacity-25" : `${noBorder ? "border-none" : "border-app-input-border"} ${disabled ? "" : "hover:border-app-input-border-dark"}  focus:border-app-input-border focus:ring-app-input-border focus:ring-opacity-20 `}  focus:ring-4 rounded ${disabled ? " bg-app-input-border" : " bg-white "}  shadow-none ${placeholder ? "placeholder-black" : "placeholder-app-input-placeholder"} ${mini ? "h-32px" : "h-48px"} flex w-full items-center ${icon ? "pl-40px" : "pl-12px"} ${(errors[name] || processing || check) ? "pr-40px" : "pr-12px"} ${data[name]?.length > 0 ? mini ? "" : ` ${label ? "pb-0 pt-12px" : ""}` : ""} outline-none ${className}`}
                type={type ?? "text"}
                {...rest}
                name={name}
                disabled={disabled}
                placeholder={placeholder ? placeholder : label}
                value={data[name] ?? ""}
                onChange={e => { setData(name, e.target.value); clearErrors(name) }}
            />
            {
                (check && !noCheck) &&
                <div className={(`bg-app-input-success absolute top-0 right-0 rounded-full ${mini ? "w-32px h-32px" : "w-48px h-48px"} flex justify-center items-center text-app-green  p-1px`)}>
                    <div>
                        <CheckCircle weight='fill' />
                    </div>
                </div>
            }
            {
                (processing) &&
                <div className={(`bg-app-input-success absolute top-0 right-0 rounded-full ${mini ? "w-32px h-32px" : "w-48px h-48px"}  flex justify-center items-center text-app-input-border-light  p-1px`)}>
                    <div>
                        <Spinner name='loading' />
                    </div>
                </div>
            }
            {
                (errors[name]) &&
                <div onClick={() => setData(name, '')} className={(`absolute cursor-pointer top-0 right-0 bottom-0 text-app-input-error ${mini ? "w-32px h-32px" : "w-48px h-48px"} flex justify-center items-center p-1px`)}>
                    <abbr title={errors[name]}>
                        <WarningCircle weight="fill" />
                    </abbr>

                </div>
            }
            {(errors[name]) &&
                <div className="mt-8px">
                    <Alert>{errors?.[name] ?? "Toto pole je vyplněno špatně."}</Alert>
                </div>
            }
        </label>
    )
}

export default TextField
