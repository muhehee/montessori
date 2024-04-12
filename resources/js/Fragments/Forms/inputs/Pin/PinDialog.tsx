import Icon from "@/Components/Icon";
import { Backspace, Spinner } from '@phosphor-icons/react';
import React, { InputHTMLAttributes, ReactNode, useContext, useEffect } from "react";
import ErrorField from "../../ErrorField";
import { FormContext } from "../../FormContext";
import PinDots from "./PinDots";
import Alert from "../../Alert";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    title?: string
    header?: ReactNode
    name: any
}

export default function PinDialog(props: Props) {

    const { name, title, header } = props
    const { data, setData, errors, processing, post, submit, wasSuccessful, isDirty } = useContext(FormContext)

    function number(number: number) {
        if ((data[name]?.length ?? 0) < 6) {
            setData((_data) => ({ ..._data, [name]: `${_data[name] ?? ''}${number}` }))
        }
        else {
            setData((_data) => ({ ..._data, [name]: `${number}` }))
        }
    }

    function erase() {
        setData((_data) => ({ ..._data, [name]: (_data[name] ?? '').slice(0, -1) }))
    }

    return (
        <div className="w-full h-80vh flex flex-col justify-between" >
            <div className="flex flex-col gap-y-8px items-center justify-center text-center h-full">
                <input className="hidden" name={name} value={data[name] ?? ""} />
                {!processing ?
                    <>
                        {header ?? <h2>{title}</h2>}
                        <PinDots max={6} actual={((data[name]?.length) ?? 0) - 1} />
                    </> :
                    <Spinner />}


            </div>
            <div className="w-full">
                {
                    (errors?.[name]) &&
                    <div className="mt-24px">
                        <Alert position="top">{errors?.[name]}</Alert>
                    </div>

                }
                <ErrorField position="top" name="username" />
                <div className="grid grid-cols-3 w-full">
                    <PinButton value={1} set={number} />
                    <PinButton value={2} set={number} />
                    <PinButton value={3} set={number} />
                    <PinButton value={4} set={number} />
                    <PinButton value={5} set={number} />
                    <PinButton value={6} set={number} />
                    <PinButton value={7} set={number} />
                    <PinButton value={8} set={number} />
                    <PinButton value={9} set={number} />
                    <div></div>
                    <PinButton value={0} set={number} />
                    <PinButton value={<Backspace />} set={() => erase()} />
                </div>
            </div>
        </div>
    )
}

function PinButton({ value, set }) {

    return (
        <div onClick={() => set(value)} className="w-full py-8px cursor-pointer flex items-center justify-center text-3xl ">
            <div className="rounded h-48px w-48px flex items-center justify-center">
                {value}
            </div>
        </div>

    )
}