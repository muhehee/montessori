import React, { InputHTMLAttributes, useContext, useEffect, useState } from 'react'
import Alert from '../Alert'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    name: string
    labelClassName?: string
    wraperClassName?: string
    length: number
}

function CodeField(props: Props) {
    const { label, className, name, labelClassName, wraperClassName, length, ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)
    const [code, setcode] = useState<Array<string>>([])

    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    const onpasted = (e) => {
        let data = e.clipboardData.getData('Text');

        if (data?.length == 8) {
            setcode(c => data?.split(""));
        }

        if(data?.length == 6){
            setcode(c => data?.split(""));
        }
    }

    const onkeydown = (e, index) => {
        var KeyID = e.keyCode;

        if (KeyID == 8 && e.target.value == "") {
            setcode(c => {
                let x = [...c];
                return (x.pop() == "") ? x.slice(0, -1) : x
            });

            const t = e.target;
            const { value } = t;

            if (t.previousElementSibling && value.length == 0) {
                (t.previousElementSibling as HTMLElement).focus();
            }

        }
    }

    useEffect(() => {
        setData(d => ({ ...d, [name]: code.join("") }));
        clearErrors(name);
    }, [code])

    return (
        <label className={("w-full flex flex-col box-border ") + (wraperClassName)}>
            <div className={(" ") + labelClassName}>{label}</div>
            <div className="-mx-4px flex">
                {
                    Array(length).fill(0).map((e, i) =>
                        <input
                            autoFocus={(i === 0) ? true : false}
                            onPaste={onpasted}
                            onKeyDown={(e) => onkeydown(e, i)}
                            key={`code-${name}-${i}`}
                            className={`border border-app-input-border rounded bg-white appearance-none text-center  placeholder-app-input-placeholder h-48px mob:h-40px flex box-border w-full mx-4px ${(code?.[i]) ? "border-app-input-placeholder" : "border-app-input-border"} border-app-input-placeholder hover:border-app-input-border focus:border-app-input-border focus:ring-app-input-border focus:ring-4 ssm:mx-1px sm:mx-2px items-center px-19px mob:px-10px outline-none ${className}`}
                            type="numeric"
                            pattern="\d*"
                            maxLength={1}
                            {...rest}
                            name={`${name}-${i}`}
                            value={code?.[i] ?? ""}
                            onChange={function (ev) {
                                const t = ev.target;
                                const { value } = t;

                                setcode(c => {
                                    let cc = [...c];
                                    cc[i] = value;
                                    return cc;
                                })

                                if (t.nextElementSibling && t.maxLength == value.length) {
                                    (t.nextElementSibling as HTMLElement).focus();
                                }
                            }}
                        />
                    )
                }
            </div>
            {errors[name] &&
                <div className="mt-12px">
                    <Alert>{errors[name]}</Alert>
                </div>
            }
        </label>
    )
}

export default CodeField
