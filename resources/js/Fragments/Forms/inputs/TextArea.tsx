import Icon from 'app/Components/Icon'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import React, { FormEvent, TextareaHTMLAttributes, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Alert from '../Alert'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string | any
    name: string
    labelClassName?: string,
    forceCheck?: boolean,
    icon?: boolean,
    noCheck?: boolean,
    noAlert?: boolean,
    admin?: boolean,
    enterToSubmit?: (e?: FormEvent) => void
    adjust?: boolean
}

function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState<boolean>(false);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}

function TextArea(props: Props) {
    const { label, className, labelClassName, name, disabled, forceCheck, noCheck = false, icon, noAlert, admin = false, enterToSubmit, adjust = true, rows: dr = 1, ...rest } = props
    const { data, setData, errors, clearErrors, processing, wasSuccessful, isDirty, submit } = useContext(FormContext)

    const [rows, setRows] = useState(dr);

    const enterPressed = useKeyPress("Enter")
    const shiftPressed = useKeyPress("Shift")

    const { seterrors } = useContext(ErrorGroupContext);

    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    function textAreaAdjust(element) {
        element.style.height = "1px";
        element.style.height = (10 + element.scrollHeight) + "px";
    }

    function enterKeyListener(e) {
        // Get the code of pressed key
        const keyCode = e?.which || e?.keyCode;

        // 13 represents the Enter key
        if (keyCode === 13 && !e?.shiftKey) {
            // Don't generate a new line
            e?.preventDefault();
            // Do something else such as send the message to back-end
            // ...
            enterToSubmit?.(e);

        }
    }

    const area = useRef<HTMLTextAreaElement>(null)

    const check = (forceCheck || (wasSuccessful && isDirty)) ? true : false

    useEffect(() => {
        if (adjust)
            textAreaAdjust(area?.current)
    }, [data[name]])

    useEffect(() => {
        if (enterToSubmit && (enterPressed && !shiftPressed)) {
            enterToSubmit({ preventDefault: () => null } as any)
        }
    }, [shiftPressed, enterPressed]);

    useEffect(() => {

        if (enterToSubmit) {
            area?.current?.addEventListener('keydown', e => enterKeyListener(e))
        }
        return () => area?.current?.removeEventListener('keydown', e => enterKeyListener(e))

    }, [area]);

    return (
        <div className="w-full relative flex-grow flex items-stretch">
            {(data[name]?.length > 0 && label?.length > 0) &&
                <span className={` text-app-input-placeholder absolute top-4px ${icon ? "left-40px" : "left-12px"} text-xs text-12`}>
                    {label}
                </span>
            }
            {icon &&
                <div className="w-48px h-48px flex items-center justify-center absolute left-0 top-0">
                    {icon}
                </div>
            }
            <textarea
                ref={area}
                onKeyUp={() => {
                    if (adjust)
                        textAreaAdjust(area.current)
                }}
                className={`border ${(errors[name]) ? "border-app-red focus:border-app-red focus:ring-app-red focus:ring-opacity-25" : (check && !noCheck) ? "border-app-green focus:border-app-green focus:ring-app-green focus:ring-opacity-25" : ` border-app-gray-E6E6E6 ${disabled ? "" : "hover:border-app-gray-999999"}  focus:border-app-gray-666666 focus:ring-app-gray-666666 focus:ring-opacity-20 `}  focus:ring-4 rounded ${disabled ? " bg-app-gray-E6E6E6" : `  ${admin ? "bg-app-orange-FDF5EA text-app-orange-AE640F placeholder:text-app-orange-AE640F border-0 focus:border-app-orange-AE640F focus:ring-app-orange-AE640F focus:ring-opacity-20 focus:ring-2" : "bg-white"}`}  shadow-none placeholder-gray-500 h-48px flex w-full items-center ${icon ? "pl-40px" : "pl-12px"} ${(errors[name] || processing || check) ? "pr-40px" : "pr-12px"} ${data[name]?.length > 0 ? " pb-0 pt-12px" : "pb-4px"} outline-none ${className}`}
                {...rest}
                name={name}
                rows={rows}
                placeholder={label}
                disabled={disabled}
                value={data[name] ?? ""}
                onChange={e => { setData(name, e.target.value); clearErrors(name) }}
            >
            </textarea>
            {
                (check && !noCheck) &&
                <div className={(`bg-green absolute top-0 right-0 rounded-full w-48px h-48px flex justify-center items-center text-app-green  p-1px`)}>
                    <CheckCircle weight='fill' />
                </div>
            }
            {
                (processing) &&
                <div className={(`bg-green absolute top-0 right-0 rounded-full w-48px h-48px flex justify-center items-center text-app-gray-666666  p-1px`)}>

                    <Icon name='loading' />
                </div>
            }
            {
                (errors[name]) &&
                <div onClick={() => setData(name, '')} className={(`absolute cursor-pointer top-0 right-0 bottom-0 text-app-red w-48px h-48px flex justify-center items-center p-1px`)}>
                    <abbr title={errors[name]}>
                        <WarningCircle weight="fill" />
                    </abbr>
                </div>
            }
            {(errors[name] && !noAlert) &&
                <div className="mt-8px">
                    <Alert>{errors?.[name] ?? "Toto pole je vyplněno špatně."}</Alert>
                </div>
            }
        </div>
    )
}

export default TextArea

