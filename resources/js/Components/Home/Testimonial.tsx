import { Info, Quotes } from "@phosphor-icons/react";
import React from "react";

interface CardElementProps {
    title: string;
    text: string;
    image: string
    icon?: React.ReactNode
    header?: string
    name?: string
    type?: string
}

export default function Testimonial(props: CardElementProps) {
    const { text, title, image, name, type } = props;
    return (
        /*  <div className="w-full relative  rounded-12px  sm:p-32px gap-16px flex items-center">
 
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
             <div className=" absolute -bottom-15px -right-20px bg-white hover:shadow-xl hover:drop-shadow-xl cursor-pointer  rounded-xl p-12px">
                 <Info className="text-black" size={24} />
             </div>
             <div className="absolute hover:scale-105 top-0 text-sm right-0 m-16px py-8px px-16px bg-app-primaryColor-darkPurple text-white rounded-md cursor-pointer" >{header}</div>
         </div> */
        <div className="relative ">
            <div className="absolute w-full h-full top-20px z-10 left-20px ">
                <Quotes className="text-[#F49D37] " size={39} />
            </div>

            <div className="relative ">


                <div className="relative bg-app-primaryColor-lightViolet pb-40px w-[361px]  rounded-xl rounded-br-xl  ">

                    <p className=" z-10 pt-80px px-40px font-normal text-xl text-start text-app-primaryColor-darkPurple leading-28px">
                        {text}
                    </p>
                    <div className="flex pt-80px px-40px text-app-primaryColor-darkPurple ">
                        <div className=" ">
                            <img className="sm:rounded-12px rounded-lg h-full object-cover" src={`/assets/img/${image}`} />
                        </div>
                        <div className="flex flex-col ml-12px ">
                            <div className="font-medium">{name}</div>
                            <div className="">{type}</div>
                        </div>
                    </div>
                    {/* <div className="absolute bg-red-500 h-[80px] -top-[50px] -rotate-90 rounded-tr-xl  left-[40px]">
                  xxx
                    </div> */}
                    <div className="absolute bg-white h-[48px] w-[48px]  rounded-br-xl  top-[0px]  -left-[0px]">

                    </div>
                    <div className="absolute  h-[16px] w-[16px]  rounded-tl-xl  top-[0px]   left-[48px]">
                        <img src={`/assets/img/subtract.svg`}></img>
                    </div>
                    <div className="absolute h-[16px] w-[16px] rounded-tr-xl  top-[48px] p  left-[0px]">
                        <img src={`/assets/img/subtract.svg`}></img>
                    </div>

                </div>
            </div>
        </div>
    );
}