import Image from "next/image";
import { CiCircleChevDown } from "react-icons/ci";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import Footer from "../Common/Footer";

export default function Landing() {
    return (
        <div className="w-full relative ">
            <div className="w-full relative">
                <Image src="/images/backgroundImage.png" alt="Hero"
                    className="object-cover relative"
                    width={1920}
                    height={1080}
                />
                <div className="w-full absolute top-[0%] flex flex-col font-brcolage-grotesque p-2 md:p-5">
                    <div className="w-full p-3">
                        <h2 className="font-bold text-[35px] md:text-[65px] lg:text-[80px] leading-12 md:leading-20 lg:leading-25">Create Motion <span className="text-white bg-black p-2 rounded-md">Graphics</span> in Seconds.</h2>
                    </div>
                    <div className="w-full p-3 text-center flex items-center justify-center flex-col">
                        <div className="md:w-[50%] w-full">
                            <p className="text-[15px] md:text-[15px]">Describe your vision in plain text and our advanced AI will instantly generate stunning, fully editable motion graphics. Fine-tune every element with our intuitive editor, then export your creation in any format you need—from MP4 to Lottie.</p>
                        </div>
                        <div className="md:w-[50%] w-full flex items-center justify-center gap-4 mt-3 ">
                            <button className="pt-2 pb-2 pl-5 pr-5 bg-black text-white rounded-lg cursor-pointer hover:bg-zinc-800">Try it</button>
                            <button className="pt-2 pb-2 pl-5 pr-5 bg-white text-black rounded-lg cursor-pointer">Demo</button>
                        </div>
                    </div>
                    <div className="bg-black mt-14 md:mt-28 text-white rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">

                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                <span className="inline-flex items-center gap-2 border border-gray-700 rounded-full px-4 py-1 text-sm font-medium">
                                    <CiCircleChevDown size={20} className="text-gray-400" />
                                    Why choose us?
                                </span>
                            </div>

                            <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                                From Prompt to Pixel-Perfect, Instantly.
                            </h3>
                            <p className="text-gray-400 text-lg mt-3">
                                Our platform is built for creators, not coders. Whether you're a marketer, designer, or entrepreneur, you can produce professional-grade animations without writing a single line of code or learning complex software.
                            </p>
                            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                                <button
                                    aria-label="Previous item"
                                    className="text-white transform transition-transform duration-300 hover:scale-110 active:scale-95"
                                >
                                    <BsArrowLeftCircle size={38} />
                                </button>
                                <button
                                    aria-label="Next item"
                                    className="text-white transform transition-transform duration-300 hover:scale-110 active:scale-95"
                                >
                                    <BsArrowRightCircle size={38} />
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <Image
                                src="/images/demo_img.webp"
                                alt="Animation showing a user easily dragging and dropping elements within the Editta editor."
                                width={450}
                                height={450}
                                unoptimized
                                className="rounded-lg"
                            />
                        </div>

                    </div>
                    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-black">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/Vector (1).png"
                                alt="Abstract white and grey vector background"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute inset-0 bg-white/20" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-4">
                            <div className="inline-flex items-center gap-2 border border-black/50 rounded-full px-4 py-1 text-sm font-semibold mb-4 backdrop-blur-sm">
                                <CiCircleChevDown size={20} />
                                <span>Save Your Time</span>
                            </div>

                            <h2 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight md:leading-snug">
                                Slash Your Workflow from Hours to Minutes. Stop Building <span className="bg-black text-white px-3 py-1 rounded-lg">From Scratch.</span>
                            </h2>
                        </div>
                    </section>
                    <div className="w-full mt-6">
                        <Footer />
                    </div>
                </div>
            </div>

        </div>
    )
}