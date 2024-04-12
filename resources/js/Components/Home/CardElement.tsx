import { Info } from "@phosphor-icons/react";
import React from "react";

interface CardElementProps {
    title: string;
    text: string;
    image: string
    icon?: React.ReactNode
    header?: string
}

export default function CardElement(props: CardElementProps) {
    const { title, text, image, icon, header } = props;
    return (
        <div className="w-full relative  rounded-12px  sm:p-32px gap-16px flex items-center  ">

            <div className="absolute overflow-hidden w-full flex flex-col pt-16px pr-64px pb-40px pl-40px bottom-0 items-start left-0">
                <div className="bg-gradient-to-b absolute rounded-xl from-app-primaryColor-darkPurple/5 blur- to-app-primaryColor-darkPurple -left-[1px] bottom-0 right-0 p-[50px]"></div>

                <h4 className="font-medium z-10 text-2xl  text-center text-white ">{title}</h4>
                <p className=" left-[40px] z-10 font-medium text-center text-white leading-24px">
                    {text}
                </p>
            </div>
            <div className="  ">
                <img className="sm:rounded-12px rounded-lg h-full object-cover" src={`/assets/img/${image}`} />
            </div>
            <div className=" absolute w-[48px] bottom-0 right-0  h-[48px] cursor-pointer ">

                <div className="absolute bg-white h-[48px] z-0 w-[48px] rounded-tl-xl  p-12px top-[0px] left-[0px]"> <Info className="text-app-primaryColor-darkPurple absolute top-12px  left-12px" size={24} /></div>
                <div className="absolute  -top-[16px] -rotate-180 right-[0px]">
                    <img src={`/assets/img/subtract.svg`}></img>
                </div>
                <div className="absolute rotate-180 top-[32px] -left-[16px]">
                    <img src={`/assets/img/subtract.svg`}></img>
                </div>
            </div>

            <div className="absolute hover:scale-105 top-0 text-sm right-0 m-16px py-8px px-16px bg-app-primaryColor-darkPurple text-white rounded-md cursor-pointer" >{header}</div>
        </div>
    );
}