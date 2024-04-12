import { FormHTMLAttributes, useContext, useEffect, useState } from 'react'
import { FormContext } from './FormContext';
import { InertiaFormProps } from 'node_modules/@inertiajs/react/types/useForm';
import { X } from '@phosphor-icons/react';


interface Props extends FormHTMLAttributes<HTMLFormElement> {
    form: InertiaFormProps<any>,
}

function ErrorMessage({ form }) {

    const [showed, setshowed] = useState(false)

    useEffect(() => {
        setshowed((form.errors && Object.values(form.errors)?.length > 0));
    }, [form.errors])

    return (
        showed ?
        <div className="flex w-full justify-center relative">
            <div className="bg-app-input-error-dark flex justify-between items-center text-white text-16 p-16px flex-grow fixed top-85px w-496px mob:w-full mob:top-55px z-99999 rounded mob:rounded-none leading-6">
                Prosím, opravte chyby ve formuláři.
                <X className="flex-shrink-0 cursor-pointer" onClick={() => setshowed(false)} />
            </div>
        </div>
        : null
    );
}


export default function Form(props: Props) {
    const { children, form, onChange , ...rest } = props

    // const check = useContext(FormContext);

    // if (check?.hasElement)
    //     throw new Error("You might have nested Form elements. That causes submit events to not work properly. If nested FormContext is required consider using only FormContext.Provider instead of full Form component. ");

    const {data, isDirty} = form;
    useEffect(() => {
        if(onChange && data && isDirty){
            onChange(data)
        }
      }, [data])

    return (
        <form {...rest}>
            {/* <ErrorMessage form={form}></ErrorMessage> */}
            <FormContext.Provider value={{ ...form, hasElement: true }}>
                {children}
            </FormContext.Provider>
        </form>
    )
}


