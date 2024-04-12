import Icon from 'app/Components/Icon'
import moment, { Moment } from 'moment'
import React, { InputHTMLAttributes, WheelEvent, useContext, useEffect, useRef, useState } from 'react'
import { ErrorGroupContext } from '../ErrorGroup'
import { FormContext } from "../FormContext"
import TextField from './TextField'
import { ArrowRight } from '@phosphor-icons/react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | any
    name: string
    placeholder?: string
    timePlaceholder?: string,
    checkOutElement?: string,
    customTime?: boolean
    up?: boolean
    onOpen?: any
    onClose?: any
}

enum VIEW {
    MONTH,
    YEAR,
    DECADE
}

function DateTimeInput(props: Props) {
    const { label, name, className, placeholder, timePlaceholder, checkOutElement, up = false, customTime = false, onOpen, onClose } = props


    const { data, setData, errors, clearErrors, } = useContext(FormContext)
    // const form = useForm({});
    // const {data} = form;

    const { seterrors } = useContext(ErrorGroupContext);
    useEffect(() => {
        seterrors(e => ({ ...e, [name]: errors[name] }))
    }, [errors[name]])

    const selected = data[name] ? moment(data[name], 'DD. MM. YYYY HH:mm:ss') : null;

    const [date, setdate] = useState(selected ?? moment())


    const [view, setview] = useState(VIEW.MONTH);
    const [opened, setopen] = useState(false);

    useEffect(() => {
      if(opened && onOpen)
        onOpen()
      if(!opened && onClose)
        onClose()
    }, [opened])
    

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
            setData(name, d.format('DD. MM. YYYY HH:mm:ss'))
            return d
        })
    }

    const changeYear = (i) => {
        setdate(y => {
            let d = moment(y);
            d.year(i)
            setData(name, d.format('DD. MM. YYYY HH:mm:ss'))
            return d
        })
    }

    const changeDay = (i) => {
        setdate(y => {
            let d = moment(y);
            d.date(i)
            setData(name, d.format('DD. MM. YYYY HH:mm:ss'))
            return d
        })
    }

    const changeHour = (i) => {
        setdate(y => {
            let d = moment(y);
            d.hours(i)
            setData(name, d.format('DD. MM. YYYY HH:mm:ss'))
            return d
        })
    }

    const changeMinute = (i) => {
        setdate(y => {
            let d = moment(y);
            d.minutes(i)
            setData(name, d.format('DD. MM. YYYY HH:mm:ss'))
            return d
        })
    }

    const removeDate = () => {
        setData(name, undefined);
    }

    const formatDate = (_date: Moment) => {
        return _date.format('D. M. YYYY');
    }

    const formatTime = (_date?: Moment | null) => {
        return _date?.format('HH:mm');
    }

    const formatDay = (_data: Moment) => {
        return _data.format('D.')
    }

    const formatMonth = (_data: Moment) => {
        return _data.format('M.')
    }

    const formatYear = (_data: Moment) => {
        return _data.format('YYYY')
    }

    // const form = useForm({});
    // const {data} = form;

    // useEffect(() => {
    //     console.log(data[`${name}_time`], data, selected ? formatTime(selected) : "time")

    //     let _hours = "00"
    //     let _minutes = "00"

    //     if (data[`${name}_time`]) {

    //     }
    // }, [data])

    // useEffect(() => {

    //     console.log(selected ? formatTime(selected) : "time")
    // }, [])

    useEffect(() => {
        // console.log("time", formatTime(selected))
        setData(`${name}_time`, selected ? formatTime(selected) : null)

        return () => {
            if(onClose)
                onClose()
        }
    }, [])

    useEffect(() => {
        if (data[`${name}_time`]?.length == 5) {
            let time = data[`${name}_time`].split(":")
            // console.log(time)
            changeHour(time[0])
            changeMinute(time[1])
        }
    }, [data[`${name}_time`]])


    return (
        <div className={`w-full `}>
            <div className='text-xs text-app-input-placeholder'>{label}</div>
            <div className="relative">
                <div onClick={() => { setopen(o => !o) }} className={` ${errors[name] ? "border-app-input-error" : "border-app-input-border"} rounded bg-white flex py-12px cursor-pointer border placeholder-app-input-placeholder h-48px box-border w-full items-center outline-none ${className}`}>
                    {/* <div className='relative'>
                        <input
                            className={` w-full outline-none placeholder-app-input-placeholder rounded  ${errors[name] ? "border-app-red" : "border-transparent"}`}
                            type="text"
                            placeholder={placeholder}
                            value={selected ? formatDate(selected) : ''}
                            onClick={e => { setopen(o => !o) }}
                            readOnly
                        />
                    </div>
                    <div className='relative'>
                        <input
                            className={`w-45px flex-shrink-0 outline-none placeholder-app-input-placeholder rounded ${errors[name] ? "border-app-red" : "border-transparent"}`}
                            type="text"
                            placeholder={timePlaceholder}
                            value={selected ? formatTime(selected) : ''}
                            onClick={e => { setopen(o => !o) }}
                            readOnly
                        />
                    </div> */}
                    <div className='w-full border-r border-app-input-border px-12px'>{selected ? formatDay(selected) : "day"}</div>
                    <div className='w-full border-r border-app-input-border px-12px'>{selected ? formatMonth(selected) : "month"}</div>
                    <div className='w-full border-r border-app-input-border px-12px'>{selected ? formatYear(selected) : "year"}</div>
                    {
                        customTime ?
                            <TextField placeholder={formatTime(selected)} name={`${name}_time`}></TextField>
                            :
                            <div className='w-full px-12px'>{selected ? formatTime(selected) : "time"}</div>
                    }




                </div>
                {
                    opened &&
                    <Picker {...{ view, changeDay, up: up, customTime: customTime, getMonthName, changeMonthorYear, setview, selected, date, changeMonth, changeYear, setopen, removeDate, changeHour, changeMinute, checkOutElement }} />
                }
            </div>
            {
                errors[name] &&
                <div className={`h-12px text-xs mt-4px text-app-input-error leading-none ${errors[name] ? "" : "opacity-0"}`}>{errors?.[name]}</div>
            }

        </div>
    )
}

export default DateTimeInput


function Picker({ view, changeDay, getMonthName, changeMonthorYear, setview, selected, date, changeMonth, changeYear, setopen, removeDate, changeHour, changeMinute, checkOutElement, customTime = false, up = false }) {
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
                console.log('je to venku?')
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
            document?.getElementById('container')?.classList.add('pointer-events-none')
            window.addEventListener('wheel', onWheel, {passive: false})
            // $(()=>{
            //     $(`.hour-${date.hours()}`)?.[0]?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
            //     setTimeout(() => {            
            //         $(`.minute-${date.minutes()}`)?.[0]?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });       
            //     }, 10);

            // })
        } catch (error) { }


        return () => {
            try {
                window?.removeEventListener('mouseup', closePicker)
                window.removeEventListener('wheel', onWheel)
                document.getElementById('container')?.classList.remove('pointer-events-none')
            } catch (error) { }
        }
    }, [])
    


    const onWheel = (e) => {
      
        let el = (e.target as HTMLElement).closest('.scroll-column');

        if(el)
        {
            e.preventDefault()
            e.stopPropagation()
            el.scrollTop = el.scrollTop + e.deltaY;
        }
    }

    return (
        <div ref={suggestions} onMouseUp={e => e.stopPropagation()} onClick={e => e.stopPropagation()} className={`absolute bottom-0 transform  ${up ? "-translate-y-1/3" : "translate-y-full"} flex gap-12px p-17px bg-white border overscroll-none border-app-input-border rounded-md z-50 -mb-18px w-max ${upOrDown ? `` : ""} ${leftOrRight && ` right-0 `}`}>
            <div className='h-[320px]'>
                {/* <Icon name="tab" className={`absolute -top-10px transition-all duration-300   z-10 ${leftOrRight ? ` right-20px ` : `left-20px`}`} /> */}
                {/* <Icon name="bin" onClick={() => removeDate()} className={`absolute top-6px right-6px transition-all duration-300 text-red hover:text-red-dark z-10 cursor-pointer`} /> */}
                <div className="flex justify-between px-24px my-28px mt-12px">
                    <ArrowRight onClick={(e) => { e.preventDefault(); changeMonthorYear(-1) }} className="transform rotate-180 cursor-pointer" />
                    {view == VIEW.MONTH && <div onClick={(e) => { e.preventDefault(); setview(VIEW.YEAR) }} className="mx-12px cursor-pointer">{getMonthName(date.month())} {date.year()}</div>}
                    {view == VIEW.YEAR && <div onClick={(e) => { e.preventDefault(); setview(VIEW.DECADE) }} className="mx-12px cursor-pointer">{date.year()}</div>}
                    {view == VIEW.DECADE && <div onClick={(e) => { e.preventDefault(); setview(VIEW.DECADE) }} className="mx-12px cursor-pointer">{date.year()} - {date.year() + 10}</div>}
                    <ArrowRight onClick={(e) => { e.preventDefault(); changeMonthorYear(1) }} className="cursor-pointer"  />
                </div>
                {
                    view == VIEW.MONTH &&
                    <div className="grid grid-cols-5 gap-x-5px gap-y-10px">
                        {
                            Array(date.daysInMonth()).fill(0).map((it, i) =>
                                <div key={`day-${i}`} onClick={() => { changeDay(i + 1); }} className={`bg-white border rounded-md border-app-input-border flex justify-center items-center w-45px h-45px cursor-pointer hover:bg-app-button/50  hover:text-app-button hover:border-app-button-dark ${((date.month() == selected?.month() && date.year() == selected?.year()) && selected.date() == (i + 1)) && 'text-app-button border-app-button-dark bg-app-button/50 '} `}>{i + 1}</div>
                            )
                        }
                    </div>
                }
                {
                    view == VIEW.YEAR &&
                    <div className="grid grid-cols-3 gap-x-5px gap-y-10px">
                        {
                            Array(12).fill(0).map((it, i) =>
                                <div key={`year-${i}`} onClick={() => { changeMonth(i); setview(VIEW.MONTH) }} className="bg-white border rounded-md border-app-input-border flex justify-center items-center px-5px h-45px cursor-pointer hover:bg-app-button/50  hover:text-app-button hover:border-app-button-dark">{getMonthName(i)}</div>
                            )
                        }
                    </div>
                }
                {
                    view == VIEW.DECADE &&
                    <div className="grid grid-cols-5 gap-x-5px gap-y-10px">
                        {
                            Array(25).fill(0).map((it, i) =>
                                <div key={`decade-${i}`} onClick={() => { changeYear(date.year() + i); setview(VIEW.YEAR) }} className="bg-white border rounded-md border-app-input-border flex justify-center items-center px-7px h-45px cursor-pointer hover:bg-app-button/50  hover:text-app-button hover:border-app-button-dark">{date.year() + i}</div>
                            )
                        }
                    </div>
                }
            </div>
            {
                !customTime &&
                <div className='h-[320px] pt-1px border-l  overscroll-none hover:z-50 border-app-input-border pl-4px flex flex-col'>
                    <div className='my-28px mt-12px flex justify-center items-center font-semibold pl-8px flex-shrink-0'>
                        {date?.format('HH:mm')}
                    </div>
                    <div className='relative flex flex-shrink  overscroll-contain hover:z-50 flex-grow justify-center overflow-hidden gap-5px'>
                        <div style={{direction: 'rtl'}} className='scroll-column  overscroll-none overflow-y-scroll overflow-x-hidden hover:z-50 tagscrollbar flex flex-col gap-8px flex-shrink-0 flex-grow px-4px'>
                            {
                                Array(24).fill(0).map((it, i) =>
                                    <div key={`hour-${i}`} onClick={() => { changeHour(i); }} className={`hour-${i} bg-white border rounded-md border-app-input-border flex justify-center items-center px-5px h-45px w-45px flex-shrink-0 cursor-pointer hover:bg-app-button/50  hover:text-app-button hover:border-app-button-dark ${(date.hours() == i) && 'text-app-button border-app-button-dark bg-app-button/50 '}`}>{moment(i, 'H').format('HH')}</div>
                                )
                            }

                            {/* <div className='w-40px bg-app-button/50-900/10 flex-shrink-0' style={{height: `10000px`}}>s</div> */}
                        </div>
                        <div className='scroll-column overscroll-none overflow-y-scroll overflow-x-hidden  hover:z-50 tagscrollbar flex flex-col gap-8px flex-shrink-0 px-4px'>
                            {
                                Array(60).fill(0).map((it, i) =>
                                    <div key={`minute-${i}`} onClick={() => { changeMinute(i); }} className={`minute-${i} bg-white border rounded-md border-app-input-border flex justify-center items-center px-5px h-45px w-45px flex-shrink-0 cursor-pointer hover:bg-app-button/50  hover:text-app-button hover:border-app-button-dark ${(date.minutes() == i) && 'text-red border-app-button-dark bg-app-button/50 '}`}>{moment(i, 'm').format('mm')}</div>
                                )
                            }
                             {/* <div className='w-40px bg-app-button/50-900/10 flex-shrink-0' style={{height: `10000px`}}>s</div> */}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
