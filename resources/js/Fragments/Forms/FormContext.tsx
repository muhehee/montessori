import { InertiaFormProps } from 'node_modules/@inertiajs/react/types/useForm';
import React from 'react';


export const FormContext = React.createContext<InertiaFormProps<Record<string, any>> & {hasElement?: boolean}>({} as InertiaFormProps<Record<string, any>>);
