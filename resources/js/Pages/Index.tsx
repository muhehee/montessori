import About from '@/Components/Home/About'
import CardElement from '@/Components/Home/CardElement'
import Testimonial from '@/Components/Home/Testimonial'
import CWrapper from '@/Layouts/CWrapper'
import Layout from '@/Layouts/Layout'
import { Columns, Files, Moon, Rows, Sun, VectorThree } from '@phosphor-icons/react'
import React, { useContext, useState } from 'react'



type Props = {}

function Index(props: Props) {




    const { } = props
    return (
        <Layout title="Carlsbad Montessori School">
            <CWrapper>
                <div className=' my-16px'>
                    <div className='bg-app-primaryColor-lightViolet py-12px px-16px rounded-xl '><img className='flex items-center' src="/assets/img/mont-logo.svg" /></div>
                </div>
            </CWrapper>
            <CWrapper>
                <div className='relative flex justify-center'>
                    <img className='w-full' src="/assets/img/video-background.png" alt="" />
                    <div className='absolute bottom-[76px]'>
                        <div className='text-[56px] text-white leading-[64px] font-medium text-center'>Enim augue sit lobortis aliquet</div>
                        <p className='text-center text-base font-normal text-white'>We are a Montessori school located in Carlsbad. We provide a nurturing and stimulating environment for children to grow and learn.</p>
                        <div className='flex relative justify-center pt-16px '>
                            <button className='bg-app-primaryColor-redCmyk absolute  flex rounded-xl  text-white py-12px px-24px font-medium '><Files className='mr-8px' size={24} />Přihláška</button>
                        </div>
                    </div>
                </div>
            </CWrapper>
            <CWrapper>
                <div className='flex w-full py-64px'>
                    <h1 className='text-[40px] leading-[48px] font-medium'>
                        Prohlédněte si naše studijní možnosti
                    </h1>
                    <p className='w-full my-auto'>Lorem ipsum dolor sit amet consectetur. Purus non arcu varius pretium tristique lacus purus egestas. Eget id dui quam dignissim. Integer convallis arcu ipsum elementum libero ornare volutpat faucibus ante.</p>
                </div>
            </CWrapper>
            <CWrapper>
                <div className='flex gap-32px pb-32px  '>
                    <CardElement
                        title={"Dětská skupina"}
                        text={"3-6 let"}
                        image={'detska-skupina.png'}
                        header={'Již brzy'}
                    />
                    <CardElement
                        title={"Základní škola"}
                        text={"3-6 let"}
                        image={'zakladni-skola.png'}
                        header={'Již brzy'} />

                    <CardElement
                        title={"Gymnázium"}
                        text={"3-6 let"}
                        image={'gymnazium.png'}
                        header={'Připravujeme'} />
                </div>


            </CWrapper>
            <CWrapper>
                <div className='flex items-center cursor-pointer '>
                    <div className='text-[40px] w-2/3  flex flex-row overflow-scroll pb-32px'>
                        Testimonials
                    </div>
                    <div className='flex w-full '>
                        <div className='flex w-2/3  justify-center border-b hover:border-b hover:border-app-primaryColor-darkPurple '>
                            rodic
                        </div>
                        <div className='flex  w-2/3 border-b justify-center hover:border-b hover:border-app-primaryColor-darkPurple'>
                            student
                        </div>
                    </div>
                </div>




                {


                    <div className='flex gap-32px pb-32px overflow-scroll  '>

                        <div>
                            <Testimonial
                                title={''}
                                text={'Lorem ipsum dolor sit amet consectetur. Adipiscing dictumst laoreet sapien massa et praesent.'}
                                image={'avatar.png'}
                                name={'John Doe'}
                                type={'Rodič'}

                            />
                        </div>
                        <div>
                            <Testimonial
                                title={''}
                                text={'Lorem ipsum dolor sit amet consectetur. Adipiscing dictumst laoreet sapien massa et praesent.'}
                                image={'avatar.png'}
                                name={'John Doe'}
                                type={'Rodič'}

                            />
                        </div>
                        <div>
                            <Testimonial
                                title={''}
                                text={'Lorem ipsum dolor sit amet consectetur. Adipiscing dictumst laoreet sapien massa et praesent.'}
                                image={'avatar.png'}
                                name={'John Doe'}
                                type={'Rodič'}

                            />
                        </div>
                        <div>
                            <Testimonial
                                title={''}
                                text={'Lorem ipsum dolor sit amet consectetur. Adipiscing dictumst laoreet sapien massa et praesent.'}
                                image={'avatar.png'}
                                name={'John Doe'}
                                type={'Rodič'}

                            />
                        </div>

                    </div>
                }

            </CWrapper>
            <CWrapper>
                <About />
            </CWrapper>
            <CWrapper>

            </CWrapper>
        </Layout>
    )
}

export default Index