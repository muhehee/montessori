
import Form from "@/Fragments/Forms/Form";
import { Link, useForm } from "@inertiajs/react";
import { Phone, At, InstagramLogo, YoutubeLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Input } from "postcss";

const Footer = () => {
    const form = useForm({});
    const { data } = form;

    /* function subscribe() {
        if (!form?.processing) {
            form?.post(route("subscribe"), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    form?.setData({ email: "" })
                }
            })
        }
    } */

    return (
        <div className="flex justify-center w-full bg-app-primaryColor-darkPurple  ">

            <div className=" w-full pt-32px pb-140px px-64px sm:px-20px  ">

                <div className="flex justify-between">
                    <img className='' src="/assets/img/mont-logo2.png" />
                    <div className="flex gap-16px">
                        <InstagramLogo className="text-white" />
                        <YoutubeLogo className="text-white" />
                        <LinkedinLogo className="text-white" />
                    </div>

                </div>
                <div className="w-full flex flex-col border-t border-b py-32px border-[#241E5C]  gap-24px sm:flex-col">

                    <div className="text-white text-40px  sm:text-[24px] leading-48px w-full pt-20px ">
                        Důležité odkazy
                    </div>
                    <div className="flex flex-col text-white gap-8px">
                        <Link className="hover:underline" href={"#"}>Enim augue sit lobortis aliquet</Link>
                        <Link className="hover:underline" href={"#"}>Enim augue sit lobortis aliquet</Link>
                        <Link className="hover:underline" href={"#"}>Enim augue sit lobortis aliquet</Link>
                        <Link className="hover:underline" href={"#"}>Enim augue sit lobortis aliquet</Link>
                        <Link className="hover:underline" href={"#"}>Enim augue sit lobortis aliquet</Link>

                    </div>



                    {/*    <Form
                        form={form}
                        id="subscribeForm"
                        onSubmit={e => {
                            e.preventDefault()
                            subscribe()
                        }}
                        className="flex nMob:w-500px flex-shrink-0 gap-x-16px text-white"
                    >
                        <input
                            name="email"
                            type="email"
                            label="Váš email"
                            className='w-full no-autofill-color'
                        ></input>

                        <button
                            type="submit"
                            form="subscribeForm"
                            className="bg-transparent w-min border-white border text-white hover:border-white-70"
                        >
                            {form?.processing ? "Odesílání" : form?.wasSuccessful ? "Děkujeme 🙌" : "Odeslat"}
                        </button>
                    </Form> */}
                </div>
                {/* <div className="w-full border-t border-b sm:border-t-0  border-[#241E5C] py-40px sm:py-20px flex pt-40px sm:flex-col ">
                    <div className="flex items-center w-full gap-x-24px sm:py-[20px]  ">
                        <div className="w-55px h-55px rounded-12px flex items-center justify-center text-white border  border-white">
                            <InstagramLogo size={24} />
                        </div>
                        <a href="tel:+420735 509 948" className="text-white">
                            +420 735 509 948
                        </a>
                    </div>
                    <div className="flex items-center w-full gap-x-24px">
                        <div className="w-55px h-55px rounded-12px flex items-center justify-center text-white border  border-white ">
                            <At size={24} />
                        </div>
                        <a
                            href="mailto:info@paradigma.com"
                            className="text-white sm:py-20px"
                        >
                            info@3digma.com
                        </a>
                    </div>
                </div> */}
                <div className="text-white py-32px sm:py-20px">
                    © 2024, Carlsbad Montessori
                </div>
            </div>
        </div>
    );
};

export default Footer;
