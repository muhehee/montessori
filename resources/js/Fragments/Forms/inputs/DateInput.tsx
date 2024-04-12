import Icon from 'app/Components/Icon'
import moment, { Moment } from 'moment'
import React, { InputHTMLAttributes, useContext, useEffect, useRef, useState } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"
import { ArrowRight, Trash } from '@phosphor-icons/react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    name: string
    placeholder?: string
}

enum VIEW {
    MONTH,
    YEAR,
    DECADE
}

function DateInput(props: Props) {
    const { label, name, className, placeholder } = props

    const { data, setData, errors, clearErrors } = useContext(FormContext)

    //UNFINISHED
    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    const selected = data[name] ? moment(data[name], 'D. M. YYYY') : null;

    const [date, setdate] = useState(selected ?? moment())


    const [view, setview] = useState(VIEW.MONTH);
    const [opened, setopen] = useState(false);

    const getMonthName = (i) => {
        date.month(i);
        return date.locale('cs-CZ').format('MMMM');
    }

    const changeMonthorYear = (i) => {

        setdate(y => {
            let d = moment(y);
            if (view == VIEW.MONTH)
                changeMonth(d.month() + i)
            else if (view == VIEW.YEAR)
                changeYear(d.year() + i)
            else
                changeYear(d.year() + (i * 10))
            return d
        })

    }

    const changeMonth = (i) => {
        setdate(y => {
            let d = moment(y);
            d.month(i)
            return d
        })
    }

    const changeYear = (i) => {
        setdate(y => {
            let d = moment(y);
            d.year(i)
            return d
        })
    }

    const changeDay = (i) => {
        setdate(y => {
            let d = moment(y);
            d.date(i)
            setData(name, d.format('D. M. YYYY'))
            return d
        })
    }

    const removeDate = () => {
        setData(name, undefined);
    }

    const formatDate = (_date: Moment) => {
        return _date.format('D. M. YYYY');
    }

    console.log(opened);

    return (
        <div >
            <div>{label}</div>
            <div className="relative">
                <div className="flex items-center w-full">
                    <input
                        className={`border ${errors[name] ? "border-app-input-error" : "border-app-input-border"} rounded bg-white  placeholder-app-input-placeholder h-55px flex box-border w-full items-center px-19px pr-64px outline-none ${className}`}
                        type="text"
                        placeholder={placeholder}
                        value={selected ? formatDate(selected) : ''}
                        onClick={e => { setopen(o => !o) }}
                        readOnly
                    />
                    {/* <Icon onClick={e => { setopen(o => !o) }} name="calendar" className="right-24px absolute cursor-pointer " /> */}
                </div>
                {
                    opened &&
                    <Picker {...{ view, changeDay, getMonthName, changeMonthorYear, setview, selected, date, changeMonth, changeYear, setopen, removeDate }} />
                }
            </div>
            {
                errors[name] &&
                <div className={`h-12px text-xs mt-4px text-app-input-error leading-none ${errors[name] ? "" : "opacity-0"}`}>{errors?.[name]}</div>
            }
        </div>
    )
}

export default DateInput


function Picker({ view, changeDay, getMonthName, changeMonthorYear, setview, selected, date, changeMonth, changeYear, setopen, removeDate }) {
    const suggestions = useRef<HTMLDivElement>(null)
    const [upOrDown, setupOrDown] = useState(false)
    const [leftOrRight, setleftOrRight] = useState(false)

    const isOutViewport = (element: HTMLDivElement | null) => {

        try {
            if (!element)
                return;

            var bounding = element.getBoundingClientRect();

            if (bounding.left < 0) {
                // Left side is out of viewoprt
            }

            if (bounding.bottom > (window?.innerHeight || document?.documentElement.clientHeight) && !upOrDown) {
                setupOrDown(true)
            }

            if (bounding.right > (window?.innerWidth || document?.documentElement.clientWidth)) {
                setleftOrRight(true);
            }

            if (bounding.top < 0) {
                // Top side is out of viewport
            }
        } catch (error) { }
    }

    const closePicker = () => setopen(false)


    useEffect(() => {
        isOutViewport(suggestions.current);
        try {
            window?.addEventListener('mouseup', closePicker)
        } catch (error) { }

        return () => {
            try {
                window?.removeEventListener('mouseup', closePicker)
            } catch (error) { }
        }
    }, [])

    return (
        <div ref={suggestions} onMouseUp={e => e.stopPropagation()} onClick={e => e.stopPropagation()} className={`absolute bottom-0 transform translate-y-full p-17px bg-white border border-app-input-border rounded-md z-50 -mb-18px w-max ${upOrDown ? `` : ""} ${leftOrRight && ` right-0 `}`}>
            {/* <Icon name="tab" className={`absolute -top-10px transition-all duration-300  z-10 ${leftOrRight ? ` right-20px ` : `left-20px`}`} /> */}
            <Trash onClick={() => removeDate()} className={`absolute top-6px right-6px transition-all duration-300 text-app-input-error hover:text-app-input-error-dark z-10 cursor-pointer`} />
            <div className="flex justify-between px-24px my-28px mt-12px">
                <ArrowRight onClick={(e) => { e.preventDefault(); changeMonthorYear(-1) }} className="transform rotate-180 cursor-pointer"  />
                {view == VIEW.MONTH && <div onClick={(e) => { e.preventDefault(); setview(VIEW.YEAR) }} className="mx-12px cursor-pointer">{getMonthName(date.month())} {date.year()}</div>}
                {view == VIEW.YEAR && <div onClick={(e) => { e.preventDefault(); setview(VIEW.DECADE) }} className="mx-12px cursor-pointer">{date.year()}</div>}
                {view == VIEW.DECADE && <div onClick={(e) => { e.preventDefault(); setview(VIEW.DECADE) }} className="mx-12px cursor-pointer">{date.year()} - {date.year() + 10}</div>}
                <ArrowRight onClick={(e) => { e.preventDefault(); changeMonthorYear(1) }} className="cursor-pointer"  />
            </div>
            {
                view == VIEW.MONTH &&
                <div className="grid grid-cols-7 gap-x-5px gap-y-10px">
                    {
                        Array(date.daysInMonth()).fill(0).map((it, i) =>
                            <div key={`day-${i}`} onClick={() => { changeDay(i + 1); }} className={`bg-white border rounded-md border-app-input-border flex justify-center items-center w-45px h-45px cursor-pointer hover:bg-app-button/50 hover:text-app-button hover:border-app-button-dark ${((date.month() == selected?.month() && date.year() == selected?.year()) && selected.date() == (i + 1)) && 'text-app-button border-app-button-dark bg-app-button/50 '} `}>{i + 1}</div>
                        )
                    }
                </div>
            }
            {
                view == VIEW.YEAR &&
                <div className="grid grid-cols-3 gap-x-5px gap-y-10px">
                    {
                        Array(12).fill(0).map((it, i) =>
                            <div key={`year-${i}`} onClick={() => { changeMonth(i); setview(VIEW.MONTH) }} className="bg-white border rounded-md border-app-input-border flex justify-center items-center px-5px h-45px cursor-pointer hover:bg-app-button/50 hover:text-app-button hover:border-app-button-dark">{getMonthName(i)}</div>
                        )
                    }
                </div>
            }
            {
                view == VIEW.DECADE &&
                <div className="grid grid-cols-5 gap-x-5px gap-y-10px">
                    {
                        Array(25).fill(0).map((it, i) =>
                            <div key={`decade-${i}`} onClick={() => { changeYear(date.year() + i); setview(VIEW.YEAR) }} className="bg-white border rounded-md border-app-input-border flex justify-center items-center px-7px h-45px cursor-pointer hover:bg-app-button/50 hover:text-app-button hover:border-app-button-dark">{date.year() + i}</div>
                        )
                    }
                </div>
            }
        </div>
    )
}
