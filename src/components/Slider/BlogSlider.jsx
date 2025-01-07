import React from 'react';
import Slider from 'react-slick';
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

export default function BlogSlider({ blogData }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        }
      }
    ]
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <Slider {...settings} className="blog-slider">
        {blogData?.map((blogItem, index) => (
          <motion.div
            key={blogItem._id || index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            className="px-2 py-4"
          >
            <div className="h-full rounded-xl blog-card overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              {blogItem?.FeatureImage?.asset?.url && (
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    src={blogItem.FeatureImage.asset.url}
                    alt={blogItem.title || "Blog image"}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <h5 className="mb-3 text-lg sm:text-xl font-bold text-primaryColor line-clamp-2">
                  {blogItem?.projectName}
                </h5>
                {blogItem?.excerpt && (
                  <div className="mb-4">
                    <PortableText
                      value={blogItem.excerpt}
                      components={{
                        block: {
                          normal: ({children}) => (
                            <p className="text-sm sm:text-base text-secondaryColor line-clamp-3">
                              {children}
                            </p>
                          )
                        }
                      }}
                    />
                  </div>
                )}
                {blogItem?.slug?.current && (
                  <motion.a 
                    href={`/blogs/${blogItem.slug.current}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-buttonBg rounded-lg transition-colors duration-300 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-4 h-4 ms-2 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
}