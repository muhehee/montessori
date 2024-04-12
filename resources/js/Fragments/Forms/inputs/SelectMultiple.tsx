import Icon from 'components/Icon'
import { Info, Trash, XCircle } from '@phosphor-icons/react';
import React, { Children, InputHTMLAttributes, useContext, useEffect, useRef, useState } from 'react'
import Alert from '../Alert';
import { ErrorGroupContext } from '../ErrorGroup';
import { FormContext } from "../FormContext";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    options: Array<{ text: string | any, value: string | number, element?: any }>
    placeholder?: string
    onChange?: any
    label?: string | any
    name?: string
    labelClassName?: string
    showPlaceholder?: boolean
    max?: number,
    notDisplaySelected?: boolean
}


function Suggestion(props) {

    const suggestions = useRef<HTMLDivElement>(null)
    const [upOrDown, setupOrDown] = useState(false)

    const isOutViewport = (element: HTMLDivElement | null) => {

        try {
            if (!element)
                return;

            var bounding = element.getBoundingClientRect();

            if (bounding.left < 0) {
                // Left side is out of viewoprt
            }

            if (bounding.bottom > (window?.innerHeight || document?.documentElement.clientHeight) && !upOrDown) {
                setupOrDown(true)
            }

            if (bounding.right > (window?.innerWidth || document?.documentElement.clientWidth)) {
                // Right side is out of viewport
            }

            if (bounding.top < 0) {
                // Top side is out of viewport
            }
        } catch (error) { }
    }

    useEffect(() => {
        isOutViewport(suggestions.current);
    }, [])

    return (
        <div ref={suggestions} className={`overflow-hidden max-w-md collapsable w-full absolute bg-white border-app-input-border border shadow-lg z-30 rounded px-12px grid gap-y-8px ${upOrDown ? "top-8px translate-y-48px" : "bottom-8px -translate-y-48px"} py-12px`}>
            {props.results.slice(0, 6).map((o, i) =>
                o.element ?
                    <div onMouseDown={() => props.add(o)} className="">
                        {o.element}
                    </div>
                    :
                    <div className="">
                        <div key={`option-${i}`} className="border w-full leading-4 overflow-hidden px-12px rounded hover:bg-app-input-primary/50 border-app-input-border hover:border-app-input-border-dark py-8px cursor-pointer flex items-center justify-between" >
                            <div className="w-full overflow-hidden overflow-ellipsis flex-shrink">{o.text}</div>
                            <div className="flex-shrink-0">
                                <button>Add</button>
                            </div>

                        </div>
                    </div>
            )}
            {(props.results.length < 1) &&
                <div className="rounded bg-app-input-primary/20 p-16px flex items-center gap-16px">
                    {/* <div className="">
                        <BlueCircleIcon invert className=' text-app-orange-DF793F bg-white'><Info /></BlueCircleIcon>
                    </div> */}
                    <div className="">No results found</div>
                </div>
            }
        </div>
    );
}


function SelectMultiple(props: Props) {
    const { options, notDisplaySelected, placeholder, showPlaceholder = false, labelClassName, max = 999, className, onChange = (v) => { }, label, name = "select", ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)
    const { seterrors } = useContext(ErrorGroupContext);

    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    const [input, setinput] = useState("");

    const [focused, setfocused] = useState(false)

    const add = (o) => {

        if ((data[name] ?? [])?.length < max) {
            setData(name, [...(data[name] ?? []), o.value])
            setinput("");
        }

        setfocused(false);
    }

    const remove = (v) => {
        setData(name, data[name]?.filter(f => f != v))
    }

    let results = options?.filter((o) => (o.text).toLowerCase().includes(input.toLowerCase()) && !data[name]?.includes(o.value));

    return (
        <div className={`w-full flex flex-col `} >
            <div className={`w-full ${labelClassName}`}>{label}</div>
            <div className={`relative w-full`}>
                {
                    ((data[name] ?? [])?.length < max) &&
                    <input
                        className={`border border-app-input-border hover:border-app-input-border-dark focus:border-app-input-border-dark focus:ring-app-input-border-dark focus:ring-opacity-20 focus:ring-4 rounded bg-white shadow-none placeholder-app-input-placeholder h-48px flex w-full items-center px-12px outline-none ${className}`}
                        type="text"
                        autoComplete="chrome-off"
                        placeholder={placeholder}
                        {...rest}
                        name={name}
                        value={input}
                        onChange={e => { setinput(e.target.value); clearErrors(name) }}
                        onFocus={() => setfocused(true)}
                        onBlur={() => {
                            setfocused(false)
                            setinput("")
                        }}
                    />
                }
                {
                    (focused) &&
                    <Suggestion add={add} results={results} />
                }
            </div>
            {!notDisplaySelected &&
                <div className={` ${errors[name] ? "border-app-input-error" : "border-app-input-border"}  grid gap-8px w-full items-center`}>

                    {
                        data[name]?.map(v =>
                            <div className="w-full flex items-center">
                                {options.find(o => o.value == v)?.element ??
                                    <div className="py-8px w-full rounded px-16px bg-app-white justify-between shadow flex gap-x-8px">
                                        {options.find(o => o.value == v)?.text}
                                        <Trash className="rounded-full p-3px text-app-input-error cursor-pointer" onClick={() => remove(v)} />
                                    </div>}
                                {/* <Icon className="absolute right-3px top-3px bg-red rounded-full p-3px text-white h-14px cursor-pointer" name="cross-small" onClick={() => remove(v)} /> */}

                            </div>
                        )
                    }
                </div>
            }
            {errors[name] &&
                <Alert>{errors[name]}</Alert>
            }
            {/* <div className={`h-12px mt-4px text-12 text-C86B28 ${errors[name] ? "" : "opacity-0"}`}>{errors?.[name]}</div> */}
        </div>
    )
}

export default SelectMultiple
