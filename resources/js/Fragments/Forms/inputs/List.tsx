import Icon from 'app/Components/Icon';
import React, { InputHTMLAttributes, ReactNode, useContext, useEffect, useState } from 'react'
import { ErrorGroupContext } from '../ErrorGroup';
import { FormContext } from "../FormContext";
import IconText from '../IconText';
import { X } from '@phosphor-icons/react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    button: string
    icon?: string | ReactNode
    iconClass?: string
    name: string
    mini?: boolean
    color?: string
    disabledWhite?: boolean
    primary?: boolean
    outlined?: boolean
}

function List(props: Props) {
    const { label, className, name, icon = "plus", iconClass="text-green", button, mini, color, disabledWhite, outlined, primary, disabled, ...rest } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)

    const {seterrors} = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors( e => ({...e, [name]: errors[name]   }) )
    }, [errors[name]])

    const [value, setvalue] = useState("")

    const add = (e)=> {

        e.preventDefault(); 
        if(value?.length > 0)
        {
            setData(name, [...data[name] ?? [], value]);
            setvalue(""); 
        }
    }

    return (
        <label className={`w-full flex flex-col box-border relative ${className}`}>
            <div>{label}</div>
            <div className='flex flex-col gap-4px mb-8px'>
                {
                    data?.[name]?.map((p, i) =>
                        <div className="flex items-center py-4px justify-between bg-app-input-border-light/10 p-4px rounded">
                            <IconText icon={icon} iconClass={iconClass} text={p} />
                            <X size={12} className=" text-app-input-error cursor-pointer" onClick={()=>setData(name, data[name]?.filter(i => i !==p) )} />
                        </div>
                    )
                }
            </div>
            <input
                className={`flex w-full h-55px border-b border-app-input-border py-8px bg-transparent focus:outline-none rounded`}
                type="text"
                {...rest}
                value={value}
                onChange={e => {setvalue(e.target.value)}}
                onKeyDown={(event)=>{
                    if(event.key === 'Enter') {
                        add(event);        
                    }
                }}
            />
            <div className="flex items-center text-gold mt-16px">
                <button className={`w-full ${mini ? "h-32px px-16px rounded-full" : "h-48px px-24px rounded"} flex whitespace-nowrap justify-center items-center ${disabled ? `${disabledWhite ? "bg-white border border-app-input-border text-black opacity-40":"bg-app-button-light"} pointer-events-none text-app-mid cursor-not-allowed ` : (primary ? (outlined ? " bg-white  hover:bg-app-button-light text-app-button hover:text-white border-app-button border cursor-pointer" : " bg-app-button hover:bg-app-button-light text-white cursor-pointer") : `${color?`text-white bg-[${color}] border border-[${color}] hover:bg-opacity-80`:"text-black bg-white border border-app-input-border hover:border-app-input-border-dark"} cursor-pointer`)} gap-x-8px font-semibold ${className}`} onClick={add} >{button}</button>
            </div>
            <div className={`h-12px text-xs text-app-input-error ${errors[name] ? "" : "opacity-0"}`}>{errors?.[name]}</div>
        </label>
    )
}

export default List
