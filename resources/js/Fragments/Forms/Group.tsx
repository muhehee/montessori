import { InertiaFormProps } from 'node_modules/@inertiajs/react/types/useForm';
import React, { useContext, useEffect, useState } from 'react'
import { ErrorGroupContext } from './ErrorGroup';
import { FormContext } from "./FormContext";

interface Props {
    children?: any
    name: string
    toArray?: boolean
}

function Group(props: Props) {
    const { children, name, toArray = false } = props

    const form = useContext(FormContext)
    const { errors, setData, data: dt, clearErrors: cE } = form;

    let group = dt[name] ?? {};

    //@ts-expect-error
    const sD: setDataByObject<Record<string, any>> & setDataByMethod<Record<string, any>> & setDataByKeyValuePair<Record<string, any>> = (key: any, value: any) => {
        // console.log(dt)
        if (typeof key === 'string') {
            setData(data => {
                let d = { ...data }
                let g = d[name];

                d[name] = { ...g, [key]: value }
                return d;

            })

        } else if (typeof key === 'function') {

            setData(data => {
                let d = { ...data }
                let g = d[name];


                d[name] = key(g)

                return d;
            })

        } else {

            setData(data => ({ ...data, [name]: key }))

        }

        clearErrors(name);
    }


    const seterrors = () => {
        return Object.keys(errors)
            .filter(e => e.startsWith(`${name}.`))
            .reduce((errs, k) => {
                let key = k.replace(`${name}.`, '')

                errs[key] = errors[k];
                return errs
            }, {})
    }

    const clearErrors = (...fields) => {
        cE(...fields?.map(f => `${name}.${f}`))
    }

    const { seterrors: sE, hasErrors, errors: errs } = useContext(ErrorGroupContext);

    const groupseterrors = (callback) => {
        let es = seterrors()
        sE(e => ({ ...e, [name]: (Object.keys(es ?? {}).length == 0) ? undefined : es }))
    }

    useEffect(() => {
        sE(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])


    return (
        <ErrorGroupContext.Provider value={{ seterrors: groupseterrors, hasErrors, errors: errs }}>
            <FormContext.Provider value={{
                ...form,
                data: group,
                setData: sD,
                errors: seterrors(),
                clearErrors

            }}>
                {children}
                {
                    errors[name] &&
                    <div className={`h-12px text-12 text-C86B28 whitespace-nowrap ${errors[name] ? "" : "opacity-0"}`}>{errors?.[name]}</div>
                }
            </FormContext.Provider>
        </ErrorGroupContext.Provider>

    )
}

export default Group
