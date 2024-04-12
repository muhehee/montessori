import { Quotes } from '@phosphor-icons/react'
import React from 'react'

type Props = {}

function About({ }: Props) {
    return (
        <div className='flex w-full pb-32px'>
            <img src={`/assets/img/about.png`} className='w-1/2' alt="" />
            <div className='flex flex-col px-64px w-full  gap-32px  justify-center '>
                <h1 className='text-[40px] font-bold'>O nás</h1>

                <p className='text-base'>Lorem ipsum dolor sit amet consectetur.
                    Duis mauris vulputate mi lobortis integer vel
                    donec malesuada dui. Euismod molestie amet
                    lectus at orci. Ornare vestibulum massa
                    velit lacus. Ut vitae consectetur lectus
                    diam morbi dui.</p>

                <div className='flex justify-start'>
                    <Quotes className='text-[#F49D37] ' size={32} />
                    <div className='border-b w-full my-auto ml-16px border-[#F1F0FA]'></div>
                </div>
                <div className='w-full'>
                    <p>Lorem ipsum dolor sit amet consectetur. Adipiscing dictumst laoreet sapien massa et praesent.</p>
                </div>
                <div className="flex  text-app-primaryColor-darkPurple ">
                    <div className=" ">
                        <img className="sm:rounded-12px rounded-lg h-full object-cover" src={`/assets/img/avatar.png`} />
                    </div>
                    <div className="flex flex-col ml-12px ">
                        <div className="font-medium">Miroslava Brožová</div>
                        <div className="">Ředitelka</div>
                    </div>

                </div>
                <div className='flex justify-end '>
                    <button className='bg-app-primaryColor-redCmyk px-24px py-12px rounded-xl text-white font-medium'>O nás</button>
                </div>
            </div>
        </div>
    )
}

export default About