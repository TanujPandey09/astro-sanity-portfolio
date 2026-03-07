import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Blogs({ blogData }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterWork, setFilterWork] = useState(blogData);

  // Derive categories dynamically from data
  const categories = ["All", ...new Set(blogData.map(blog => blog.Category).filter(Boolean))];

  const handleFilter = (item) => {
    setActiveFilter(item);
  };

  useEffect(() => {
    if (activeFilter === "All") {
      setFilterWork(blogData);
    } else {
      const filtered = blogData.filter((blog) =>
        blog.Category?.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilterWork(filtered);
    }
  }, [activeFilter, blogData]);

  return (
    <div className="relative min-h-screen py-16 md:py-32 selection:bg-[#599692]/30">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header (Simplified to match SectionHeader style) */}
        <div className="mb-16 md:mb-24 text-center md:text-left" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#599692]"></div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#599692]">Journal</span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#599692]"></div>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter mb-6 md:mb-8 leading-none">
            Research <span className="text-gradient">& Intel</span>
          </h2>
          <p className="max-w-2xl text-[#626c7d] text-base md:text-lg italic font-medium leading-relaxed mx-auto md:mx-0">
            "Decoding complexity through technical narrative and architectural analysis."
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 md:mb-24 border-b border-white/5 pb-6 md:pb-8 justify-center md:justify-start" data-aos="fade-up">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleFilter(item)}
              className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all relative pb-2 ${activeFilter === item ? "text-[#599692]" : "text-[#626c7d] hover:text-white"
                }`}
            >
              {item}
              {activeFilter === item && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#599692]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Blogs List (Awwwards Style) */}
        <div className="space-y-0">
          <AnimatePresence mode='popLayout'>
            {filterWork.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="group relative py-8 md:py-12 border-b border-white/5 last:border-0"
              >
                <a href={`/blogs/${blog.slug?.current}`} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 md:gap-6 mb-3 md:mb-4">
                      <span className="text-[8px] md:text-[10px] font-black text-[#599692] opacity-40">0{index + 1}</span>
                      <span className="text-[8px] md:text-[10px] font-black text-[#626c7d] uppercase tracking-widest">{blog.Category || "Technology"}</span>
                    </div>

                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-[#599692] transition-colors uppercase tracking-tight leading-none">
                      {blog.projectName}
                    </h3>
                  </div>

                  {/* Hover Image Reveal */}
                  <div className="hidden lg:block w-48 h-48 rounded-[2rem] overflow-hidden scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-[#599692]/30 bg-[#11172a]">
                    {blog.FeatureImage?.asset?.url && (
                      <img
                        src={blog.FeatureImage.asset.url}
                        alt={blog.projectName}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 group-hover:bg-[#599692] group-hover:border-[#599692] group-hover:text-white transition-all duration-500 shrink-0">
                    <svg width="18" height="18" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filterWork.length === 0 && (
          <div className="text-center py-48" data-aos="fade-up">
            <p className="text-[#626c7d] text-[10px] font-black uppercase tracking-[0.5em]">No synchronization found for this frequency.</p>
          </div>
        )}
      </div>
    </div>
  );
}