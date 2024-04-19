import { Swiper, SwiperSlide } from "swiper/react";
import { PortableText } from "@portabletext/react"; 
import 'swiper/css/effect-cube';
import "swiper/css";
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
export default function ProjectSlider(props) {
    console.log(props)
    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                pagination={true}
            // modules={[EffectCube, Pagination]}
            // className="mySwiper"
            >

                {
                    props?.projectData?.map((projectItem) => {
                        return (
                            <>

                                <SwiperSlide key={projectItem}>

                                    <div class="h-auto rounded-lg projects-card overflow-hidden shadow-lg hover:mx-1 hover:shadow-xl transition-transform duration-1000 transform hover:scale-105">
                                        <img
                                            class="w-full h-40 mb-8"
                                            src={`${projectItem?.BackgroundImage?.asset?.url}`}
                                        />
                                        <div class="px-4 py-4 mt-4">
                                            <h5 class="mb-2 text-lg font-sans  font-bold text-primaryColor">
                                                {projectItem?.projectName}
                                            </h5>

                                            <PortableText
                                                class="text-sm font-Roboto text-secondaryColor"
                                                value={projectItem?.excerpt}
                                            />

                                            <a
                                                href={`/projects/${projectItem.slug.current}`}
                                                class="inline-flex items-center px-3 py-2 mt-6 text-sm font-medium text-center text-white bg-buttonBg rounded-lg hover:bg-slate-500  hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Read more
                                                <svg
                                                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                </SwiperSlide>

                            </>
                        );
                    })
                }

            </Swiper>
        </>
    );
}
