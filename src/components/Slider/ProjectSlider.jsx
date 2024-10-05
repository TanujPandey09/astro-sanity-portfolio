import React from 'react';
import Slider from 'react-slick';
import { PortableText } from "@portabletext/react";

// CSS imports should be handled by Astro
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProjectSlider({ projectData }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {projectData?.map((projectItem, index) => (
        <div key={projectItem._id || index} className="px-2">
          <div className="h-auto rounded-lg projects-card overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-1000 transform hover:scale-105 m-2 sm:m-4">
            {projectItem?.BackgroundImage?.asset?.url && (
              <img
                className="w-full h-auto aspect-video object-cover mb-4 sm:mb-8"
                src={projectItem.BackgroundImage.asset.url}
                alt={projectItem.projectName || "Project image"}
              />
            )}
            <div className="px-2 sm:px-4 py-2 sm:py-4 mt-2 sm:mt-4">
              <h5 className="mb-2 text-base sm:text-lg md:text-xl font-sans font-bold text-primaryColor">
                {projectItem?.projectName || "Untitled Project"}
              </h5>
              {projectItem?.excerpt && (
                <PortableText
                  value={projectItem.excerpt}
                  components={{
                    block: {
                      normal: ({children}) => <p className="text-xs sm:text-sm font-Roboto text-secondaryColor">{children}</p>
                    }
                  }}
                />
              )}
              {projectItem?.slug?.current && (
                <a 
                  href={`/projects/${projectItem.slug.current}`}
                  className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 mt-3 sm:mt-6 text-xs sm:text-sm font-medium text-center text-white bg-buttonBg rounded-lg hover:bg-slate-500 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}