import { Swiper, SwiperSlide } from "swiper/react";
import { PortableText } from "@portabletext/react";
import 'swiper/css/effect-cube';
import "swiper/css";
import 'swiper/css/effect-cards';
import './style.css'
import { EffectCards } from 'swiper/modules';
export default function BlogSlider(props) {
    console.log(props)

    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                pagination={true}
                className="mySwiper"

            >

            
{
                    props?.blogData?.map((blogItem) => {
                        return (
                            <>
                            <SwiperSlide key={blogItem}>
                                <div class="projects-card h-full flex flex-col  rounded-lg overflow-hidden shadow-lg hover:mx-1 hover:shadow-xl transition-transform duration-1000 transform hover:scale-105">
                                        <img
                                            class="rounded-t-lg  h-52"
                                            src={`${blogItem?.FeatureImage?.asset?.url}`}

                                        />
                                        <div class="p-5">
                                            <h5 class="mb-2 text-lg font-sans font-bold tracking-tight text-primaryColor ">
                                                {blogItem?.projectName}
                                            </h5>
                                            <div
                                                class="text-sm mb-2overflow-hidden text-secondaryColor"
                                                // style="max-height:6rem;"
                                            >
                                                <PortableText
                                                    class="text-sm mb-2 "
                                                    value={blogItem?.excerpt}
                                                />
                                            </div>

                                            <a
                                                href={`/blogs/${blogItem.slug.current}`}
                                                class="inline-flex items-center px-3 mt-3 py-2 text-sm font-medium text-center text-white bg-buttonBg rounded-lg hover:bg-slate-500  hover:text-black focus:ring-4 focus:outline-none "
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
