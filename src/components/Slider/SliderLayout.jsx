import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import "swiper/css";

export default function MySwiper(props) {
  return (
    <>
      <div className="container mx-auto py-12 text-center">
      <h1 className="font-Roboto text-3xl text-white font-medium">Skills Section</h1>
       
        <Swiper
          slidesPerView={7}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
    
        >
          {props?.skilldata?.skillData[0]?.logoCase?.map((item,) => {
            console.log(item);
            return (
              <>
             
                <SwiperSlide className="mt-10" key={item?.Logo?.asset?.assetId}>
                  <img className="max-w-full h-20" src={`${item?.Logo?.asset?.url}`} alt={`${item?.Logo?.alt}`} />
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
