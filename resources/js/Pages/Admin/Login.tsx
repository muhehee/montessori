import Form from '@/Fragments/Forms/Form'
import PasswordField from '@/Fragments/Forms/inputs/PasswordField'
import Submit from '@/Fragments/Forms/inputs/Submit'
import TextField from '@/Fragments/Forms/inputs/TextField'
import { useForm } from '@inertiajs/react'
import React from 'react'

type Props = {}

function Login({ }: Props) {
    const form = useForm({})
    const { data, post } = form

    function submit(e: any) {
        e.preventDefault();
        post(route('login'));
        console.log('bro?')
    }

    return (
        <div className='w-full h-screen flex justify-center items-center' >
            <div className='w-1/2'>
                <div className='flex mb-24px font-bold text-center flex-col gap-12px'>Prihlaseni</div>
                <Form onSubmit={submit} className='flex flex-col gap-12px' form={form}>
                    Admin Login
                    <TextField label={'email'} name={'email'} />
                    <PasswordField label={'password'} name={'password'} />
                    <Submit className='bg-[#5396481A] text-[#53964899] hover:bg-[#539648] hover:text-white flex justify-center ' value="Přihlásit se" />
                </Form>
            </div>
        </div>
    )
}

export default Login