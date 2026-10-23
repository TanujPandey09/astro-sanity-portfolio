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
    <div className="relative min-h-screen py-16 md:py-32 selection:bg-accent-primary/30">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">

        {/* Header (Simplified to match SectionHeader style) */}
        <div className="mb-16 md:mb-24 text-center md:text-left" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-accent-primary"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-accent-primary">Journal</span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-accent-primary"></div>
          </div>
          <h2 className="text-text-primary text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter mb-6 md:mb-8 leading-none">
            Research <span className="text-gradient">& Intel</span>
          </h2>
          <p className="max-w-2xl text-text-muted text-base md:text-lg italic font-medium leading-relaxed mx-auto md:mx-0">
            "Decoding complexity through technical narrative and architectural analysis."
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 md:mb-24 border-b border-border-subtle pb-6 md:pb-8 justify-center md:justify-start" data-aos="fade-up">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleFilter(item)}
              className={`text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all relative pb-2 ${activeFilter === item ? "text-accent-primary" : "text-text-muted hover:text-text-primary"
                }`}
            >
              {item}
              {activeFilter === item && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-primary"
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
                className="group relative py-8 md:py-12 border-b border-border-subtle last:border-0"
              >
                <a href={`/blogs/${blog.slug?.current}`} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 md:gap-6 mb-3 md:mb-4">
                      <span className="text-[11px] font-black text-accent-primary opacity-60">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[11px] font-black text-text-dim uppercase tracking-widest">{blog.Category || "Technology"}</span>
                    </div>

                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-text-primary group-hover:text-white transition-colors uppercase tracking-tight leading-none">
                      {blog.projectName}
                    </h3>
                  </div>

                  {/* Hover Image Reveal */}
                  <div className="hidden lg:block w-48 h-48 rounded-2xl overflow-hidden scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-border-subtle bg-surface-card">
                    {blog.FeatureImage?.asset?.url && (
                      <img
                        src={blog.FeatureImage.asset.url.includes("?") ? `${blog.FeatureImage.asset.url}&auto=format&fit=max&w=400&q=80` : `${blog.FeatureImage.asset.url}?auto=format&fit=max&w=400&q=80`}
                        alt={blog.projectName || "Blog article preview"}
                        loading="lazy"
                        decoding="async"
                        width="200"
                        height="200"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-border-subtle group-hover:bg-accent-primary group-hover:border-accent-primary group-hover:text-white transition-all duration-500 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
            <p className="text-text-dim text-[10px] font-black uppercase tracking-[0.5em]">No synchronization found for this frequency.</p>
          </div>
        )}
      </div>
    </div>
  );
}