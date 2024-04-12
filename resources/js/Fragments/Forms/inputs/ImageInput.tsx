
import { Warning } from 'postcss'
import React, { InputHTMLAttributes, useContext, useEffect } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"
import { Upload } from '@phosphor-icons/react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    imagePreview?: boolean
    height?: string
}

function ImageInput(props: Props) {
    const { label, name = "file", imagePreview = false, height = "h-[160px]", ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)

    const {seterrors} = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors( e => ({...e, [name]: errors[name]   }) )
    }, [errors[name]])

    let fileList = data?.[name] as FileList;

    let preview = fileList ? Object.values(fileList)?.[0] : null;

    function prevent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function dropFile(e) {
        prevent(e);
        let droppedFiles = e?.dataTransfer?.files as FileList;
        if (droppedFiles) {
            setData(`${name}`, droppedFiles);
        }

    };

    


    if (name.includes('[]'))
        throw new Error("Dont include [] in input name for multiple files, just add prop 'multiple | multiple={true}' ");

    let errs =  Object.keys(errors)
        .filter(e => e.startsWith(`${name}`))
        .map(err => errors[err])
        .join(', ')

    return (
        <label className={`cursor-pointer relative block `}
            onDrag={prevent}
            onDragStart={prevent}
            onDragEnd={prevent}
            onDragOver={prevent}
            onDragEnter={prevent}
            onDragLeave={prevent}
            onDrop={dropFile}

        >

            <div>{label}</div>
            <input
                className="opacity-0 w-0 h-0 absolute"
                type="file"
                {...rest}
                name={`${name}[]`}
                onChange={e => { setData(name, e.target.files); clearErrors(name) }}
            />
            <div className={`flex items-center px-40px flex-col bg-app-input-border-light/20 rounded justify-center ${height} relative z-10 overflow-hidden`}>
                {
                    (imagePreview && preview && preview.type.startsWith("image")) &&
                    <img className="absolute top-0 left-0 h-full w-full object-cover object-center z-0" src={URL.createObjectURL(preview)} alt="Preview - Nahledovy obrazek" />
                }
                <button className="pointer-events-none mob:w-full text-left justify-start z-10 flex gap-16px items-center" onClick={e => { e.preventDefault(); }}><Upload /> {(fileList?.length > 0) ? "Změnit soubor" : "Nahrát soubor"}</button>
                <div className="mt-12px text-xs mob:ml-0 mob:mt-8px z-10 bg-app-input-border-light/40 rounded px-6px ">
                    {
                        (fileList?.length > 0)
                            ? (
                                Object.values(fileList)?.map((f: any) =>
                                    <span className={`${Math.floor(f?.size / 1000 / 10) / 100 > 5 && "text-app-input-error"}`}>{f?.name} ({Math.floor(f?.size / 1000 / 10) / 100} Mb), </span>
                                )

                            )

                            : "Maximální velikost souboru je 5Mb"
                    }
                </div>
            </div>
            <div className={`h-12px text-xs text-app-input-error ${errs ? "" : "opacity-0"}`}> { errs } </div>
        </label>
    )
}

export default ImageInput
