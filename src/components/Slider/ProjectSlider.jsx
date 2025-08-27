import React from 'react';
import Slider from 'react-slick';
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

export default function ProjectSlider({ projectData }) {
  console.log(projectData, "Project Data")
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
      <Slider {...settings} className="project-slider">
        {projectData?.map((projectItem, index) => (
          <motion.div
            key={projectItem._id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="px-3 py-5"
          >
            <div className="relative py-5 group overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 to-gray-800">

              {/* Project Image */}
              {projectItem?.BackgroundImage?.asset?.url && (
                <img
                  src={projectItem.BackgroundImage.asset.url}
                  alt={projectItem.projectName}
                  className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{projectItem.projectName}</h3>

                {projectItem?.excerpt && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {projectItem.excerpt[0]?.children?.[0]?.text || ""}
                  </p>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  {projectItem?.slug?.current && (
                    <a
                      href={`/projects/${projectItem.slug.current}`}
                      className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition"
                    >
                      Read More →
                    </a>
                  )}

                  {projectItem?.demoLink && (
                    <a
                      href={projectItem.demoLink.current}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-medium hover:bg-gray-200 transition"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        ))}
      </Slider>
    </div>
  );
}