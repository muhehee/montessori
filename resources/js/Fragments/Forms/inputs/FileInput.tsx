
import { Paperclip } from '@phosphor-icons/react'
import { Warning } from 'postcss'
import React, { InputHTMLAttributes, useContext, useEffect } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    hidefileList?: boolean
}

function FileInput(props: Props) {
    const { label, name = "file", hidefileList = false, ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)

    let fileList = data?.[name];

    if (name.includes('[]'))
        throw new Error("Dont include [] in input name for multiple files, just add prop 'multiple | multiple={true}' ");

    let errs = Object.keys(errors)
        .filter(e => e.startsWith(`${name}`))
        .map(err => errors[err])
        .join(', ')

    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])


    return (
        <label className="cursor-pointer">
            <div>{label}</div>
            <input
                className="opacity-0 w-0 h-0 absolute"
                type="file"
                {...rest}
                name={`${name}[]`}
                onChange={e => { setData(name, e.target.files); clearErrors(name) }}
            />
            <div className="flex items-center mob:flex-col mob:items-start text-app-input-primary">
                {/* <button className="pointer-events-none mob:w-full text-left justify-start" onClick={e => { e.preventDefault(); }}></button> */}
                <Paperclip />
                {
                    !hidefileList &&
                    <div className="ml-12px text-12 mob:ml-0 mob:mt-8px text-black">
                        {
                            (fileList?.length > 0)
                                ? (
                                    Object.values(fileList)?.map((f: any) =>
                                        // `${f?.name} (${Math.floor(f?.size / 1000 / 10) / 100} Mb)`
                                        <span className={`${Math.floor(f?.size / 1000 / 10) / 100 > 5 && "text-app-input-error"}`}>{f?.name} ({Math.floor(f?.size / 1000 / 10) / 100} Mb), </span>
                                    )

                                )

                                : "Add file"
                        }
                    </div>
                }
            </div>
            <div className={`h-12px text-xs text-app-input-error ${errs ? "" : "opacity-0"}`}>{errs}</div>
        </label>
    )
}

export default FileInput
