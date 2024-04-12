import Icon from 'app/Components/Icon'
import React, { HTMLProps, useContext, useEffect, useState } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"
import { ArrowDown } from '@phosphor-icons/react'

interface Props extends HTMLProps<HTMLDivElement> {
    label?: string | any
    name: string
    value: string
}

export default function OrderBy(props: Props) {

    const { className, name, value, label, ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)

    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    let [asc, setAsc] = useState(true)

    return (
        <div className="cursor-pointer flex items-center gap-16px">
            <div className={`${data["order_by"] == value ? "text-app-input-primary font-semibold" : ""}`}>{label}</div>
            <div onClick={() => {
                setData(d => ({ ...d, order: !asc ? "ASC" : "DESC", order_by: value }));
                setAsc(p => !p);
            }}>
                <ArrowDown className={(`transform duration-300 ${asc ? "rotate-180" : ""} ${data["order_by"] == value ? "text-app-input-primary" : ""}`)} />
            </div>
        </div>
    )
}
