import React, { createContext, useContext, useEffect, useState } from 'react'

interface Props {
    children: any
}

export const ErrorGroupContext = createContext({errors: {} as any, seterrors: (err) => {}, hasErrors: false})

function ErrorGroup(props: Props) {
    const { children} = props

    const [errors, seterrors] = useState({});

    let hasErrors =  (Object.keys(errors ?? {})?.filter(f => errors[f] )?.length > 0) ?? false

    return (

        <ErrorGroupContext.Provider value={{
            errors,
            seterrors,
            hasErrors
        }}>
            {children}
        </ErrorGroupContext.Provider>

    )
}

export default ErrorGroup
