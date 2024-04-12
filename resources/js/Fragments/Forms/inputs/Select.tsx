import Icon from 'components/Icon'
import { CaretDown } from '@phosphor-icons/react';
import React, { InputHTMLAttributes, useContext, useEffect, useRef, useState } from 'react'
import { ErrorGroupContext } from '../ErrorGroup';
import { FormContext } from "../FormContext";
import Alert from '../Alert';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
    options: Array<{ text: string | any, value: string | number | any, disabled?: boolean }>
    placeholder?: string
    onChange?: any
    label?: string | any
    name?: string
    labelClassName?: string
    showPlaceholder?: boolean
    clearSelection?: boolean
    nameForHiddenSelect?: string
    leftBorder?: boolean
    clickId?: string
}

function Select(props: Props) {
    const { options, clickId, placeholder, leftBorder, showPlaceholder = false, labelClassName, className, onChange = (v) => { }, label, name = "select", clearSelection = false, nameForHiddenSelect = name, ...rest } = props

    const [open, setopen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const height = useRef("0px");

    const { data, setData, errors, clearErrors } = useContext(FormContext)

    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    const collapseSection = () => {
        let element = ref.current;
        if (element) {

            var sectionHeight = element.scrollHeight;
            var elementTransition = element.style.transition;
            element.style.transition = '';

            requestAnimationFrame(function () {
                if (element) {
                    height.current = sectionHeight + 'px';
                    element.style.height = height.current;
                    element.style.transition = elementTransition;
                }
                requestAnimationFrame(function () {
                    if (element) {
                        height.current = 0 + 'px';
                        element.style.height = height.current;
                    }
                });
            });

            setopen(false);
        }
    };

    const expandSection = () => {
        let element = ref.current;
        if (element) {
            var sectionHeight = element.scrollHeight;
            height.current = sectionHeight + 'px';
            element.style.height = height.current;
            setopen(true);
        }
    };

    const toggle = () => {
        if (open)
            collapseSection()
        else
            expandSection()
    }

    const select = (o: { text: string, value: string | number } | null) => {
        setData(name, o?.value);
        clearErrors(name)
        onChange(o);
        collapseSection();
    }

    // useEffect(() => {
    //     collapseSection()
    // }, [])



    let selected = options.find(o => o.value == data?.[name]);

    const closeOnClick = () => {

        collapseSection()
    }

    const checkOnClick = (event) => {
        event.stopPropagation();
    }

    useEffect(() => {

        try {
            window?.addEventListener('click', closeOnClick)
        } catch (error) { }

        return () => {
            try {
                window?.removeEventListener('click', closeOnClick)
            } catch (error) { }
        }
    }, [])

    return (
        <div className="relative w-full" onClick={checkOnClick}>
            <div className={(" " + labelClassName)}>{label}</div>
            {/* <div className={`flex items-center h-48px rounded cursor-pointer relative`}>
                <div className={(`flex justify-between flex-grow items-center px-16px rounded  bg-app-gray-E6E6E6 pr-0 ${errors[name] ? "border-app-red" : "border-gray-500"} `)} onClick={toggle}  id={clickId}>
                    <div className={` leading-4 ${selected?.text ? "" : "text-gray-500"}`}>{selected?.text ?? placeholder}</div>
                    {
                        (clearSelection && data[name]) ?
                            <div onClick={e => { e.stopPropagation(); select(null); }} className={`h-48px w-48px flex items-center justify-center border-l ${leftBorder ? 'border-gray-500' : 'border-transparent'} hover:text-red`}>
                                <Icon className={` `} name="cross" />
                            </div>

                            :
                            <div className={`h-48px w-48px flex items-center justify-center transition-colors duration-300 border-l ${leftBorder ? 'border-gray-500' : 'border-transparent'}`}>
                                <div className={`transform ${open && 'rotate-180'}`}>
                                    <CaretDown />
                                </div>
                            </div>
                    }
                </div>
                <div ref={ref} className="overflow-x-hidden overflow-y-hidden shadow-sm collapsable absolute top-0 left-0 transform w-full selectmask mb-8px z-50" style={{ height: height.current }}>
                    <div className="bg-white absolute top-0 left-0  w-full shadow-md rounded-b-default border border-app-gray-E6E6E6 rounded border-t-0  overflow-x-hidden max-h-280px tagscrollbar z-50">
                        {showPlaceholder && <div className="border-t px-16px hover:bg-F8F2EB border-app-gray-E6E6E6 py-8px cursor-pointer" onClick={() => select(null)}>{placeholder}</div>}
                        {
                            options.map((o, i) =>
                                <div key={`option-${i}`} className="border-t leading-4 px-16px hover:bg-F8F2EB border-app-gray-E6E6E6 py-12px cursor-pointer" onClick={() => select(o)}>{o.text}</div>
                            )
                        }
                    </div>
                </div>
            </div> */}

            <select
                className={` ${className} w-full cursor-pointer h-48px rounded border border-app-input-border hover:border-app-input-border-dark focus:border-app-input-border-dark focus:ring-app-input-border-dark focus:ring-4`}
                {...rest}
                name={nameForHiddenSelect}
                value={data[name] ?? ""}
                onChange={e => { setData(name, e.target.value); clearErrors(name) }}
            >
                {
                    (placeholder && !data[name]) && <option value={""}>{placeholder}</option>
                }
                {
                    options.map((o, i) =>
                        <option key={`option-${i}`} value={o.value} disabled={o.disabled}>{o.text}</option>
                    )
                }
            </select>
            {
                errors[name] &&
                <Alert>
                    {errors?.[name]}
                </Alert>
            }
        </div>
    )
}

export default Select
