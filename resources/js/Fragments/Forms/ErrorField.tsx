import React, { InputHTMLAttributes, ReactElement, useContext, useEffect, useState } from 'react'
import Alert from './Alert'
import { ErrorGroupContext } from './ErrorGroup'
import { FormContext } from "./FormContext"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    position?: "bottom" | "top"
}

function ErrorField(props: Props) {
    const { name, position = "bottom", ...rest } = props

    const { errors } = useContext(FormContext)
    const { seterrors } = useContext(ErrorGroupContext);

    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    return (
        (errors[name]) && <div className="mt-8px">
            <Alert position={position}>{errors?.[name] ?? "Toto pole je vyplněno špatně."}</Alert>
        </div>

    )
}

export default ErrorField
